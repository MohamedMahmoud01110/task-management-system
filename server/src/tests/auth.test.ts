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

describe("Auth - Register", () => {
  it("should register the first user as admin", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "First User",
      email: "first@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe("admin");
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.password).toBeUndefined(); // Ensure password is excluded from the response
  });

  it("should register the second user as member", async () => {
    await registerUser({ email: "first2@example.com" });

    const res = await request(app).post("/api/auth/register").send({
      name: "Second User",
      email: "second2@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.user.role).toBe("member");
  });

  it("should reject registration with a duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Dup User",
      email: "dup@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Dup User 2",
      email: "dup@example.com",
      password: "654321",
    });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("should reject registration with invalid input (short password)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Bad User",
      email: "bad@example.com",
      password: "123", // Password length is less than the minimum requirement
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("Auth - Login", () => {
  it("should login successfully with correct credentials", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it("should reject login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User 2",
      email: "login2@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login2@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should reject login with non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "doesnotexist@example.com",
      password: "123456",
    });

    expect(res.status).toBe(401);
  });
});
