import request from "supertest";
import app from "../app";
import { connectTestDB, closeTestDB, clearTestDB } from "./setup";
import { registerUser } from "./helpers";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

describe("Projects", () => {
  it("should allow an authenticated user to create a project", async () => {
    const { token } = await registerUser();

    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Project", description: "A test project" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Test Project");
    expect(res.body.data.members).toHaveLength(1); // Owner is automatically added as a member
  });

  it("should reject project creation without a token", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({ name: "No Auth Project" });

    expect(res.status).toBe(401);
  });

  it("should not allow a non-member to view a project", async () => {
    const owner = await registerUser({ email: "owner@example.com" });
    const outsider = await registerUser({ email: "outsider@example.com" });

    const createRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${owner.token}`)
      .send({ name: "Private Project" });

    const projectId = createRes.body.data._id;

    const res = await request(app)
      .get(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${outsider.token}`);

    expect(res.status).toBe(403);
  });

  it("should allow the admin to add a member to any project", async () => {
    const admin = await registerUser({ email: "admin@example.com" }); // First registered user is admin
    const member = await registerUser({ email: "member@example.com" });

    const createRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${admin.token}`)
      .send({ name: "Team Project" });

    const projectId = createRes.body.data._id;

    const res = await request(app)
      .post(`/api/projects/${projectId}/members`)
      .set("Authorization", `Bearer ${admin.token}`)
      .send({ userId: member.user.id });

    expect(res.status).toBe(200);
    expect(res.body.data.members).toHaveLength(2);
  });

  it("should prevent a non-owner, non-admin member from deleting a project", async () => {
    const admin = await registerUser({ email: "admin2@example.com" }); // First registered user is admin
    const member1 = await registerUser({ email: "m1@example.com" });
    const member2 = await registerUser({ email: "m2@example.com" });

    const createRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${member1.token}`)
      .send({ name: "Member1 Project" });

    const projectId = createRes.body.data._id;

    // Member1 adds member2 to the project
    await request(app)
      .post(`/api/projects/${projectId}/members`)
      .set("Authorization", `Bearer ${member1.token}`)
      .send({ userId: member2.user.id });

    // Member2 (regular member, not owner and not admin) tries to delete the project
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${member2.token}`);

    expect(res.status).toBe(403);
  });
});
