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

async function createProjectWithMember() {
  const owner = await registerUser({ email: "owner_task@example.com" });
  const member = await registerUser({ email: "member_task@example.com" });

  const createRes = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${owner.token}`)
    .send({ name: "Task Project" });

  const projectId = createRes.body.data._id;

  await request(app)
    .post(`/api/projects/${projectId}/members`)
    .set("Authorization", `Bearer ${owner.token}`)
    .send({ userId: member.user.id });

  return { owner, member, projectId };
}

describe("Tasks", () => {
  it("should create a task inside a project", async () => {
    const { owner, projectId } = await createProjectWithMember();

    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${owner.token}`)
      .send({
        title: "First Task",
        priority: "high",
        status: "todo",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("First Task");
    expect(res.body.data.creator).toBeDefined();
  });

  it("should reject task creation from a non-member", async () => {
    const { projectId } = await createProjectWithMember();
    const outsider = await registerUser({ email: "outsider_task@example.com" });

    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${outsider.token}`)
      .send({ title: "Should Fail" });

    expect(res.status).toBe(403);
  });

  it("should reject assigning a task to a user who is not a project member", async () => {
    const { owner, projectId } = await createProjectWithMember();
    const outsider = await registerUser({ email: "not_member@example.com" });

    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${owner.token}`)
      .send({ title: "Bad Assignee Task", assignee: outsider.user.id });

    expect(res.status).toBe(400);
  });

  it("should filter tasks by status", async () => {
    const { owner, projectId } = await createProjectWithMember();

    await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${owner.token}`)
      .send({ title: "Todo Task", status: "todo" });

    await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${owner.token}`)
      .send({ title: "Done Task", status: "done" });

    const res = await request(app)
      .get(`/api/projects/${projectId}/tasks?status=done`)
      .set("Authorization", `Bearer ${owner.token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe("Done Task");
  });

  it("should allow a project member (not just creator) to update a task", async () => {
    const { owner, member, projectId } = await createProjectWithMember();

    const createRes = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${owner.token}`)
      .send({ title: "Shared Task" });

    const taskId = createRes.body.data._id;

    const res = await request(app)
      .patch(`/api/projects/${projectId}/tasks/${taskId}`)
      .set("Authorization", `Bearer ${member.token}`)
      .send({ status: "in_progress" });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("in_progress");
  });
});
