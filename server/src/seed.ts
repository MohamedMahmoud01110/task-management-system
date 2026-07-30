import mongoose from "mongoose";
import { User } from "./models/user.model";
import { Project } from "./models/project.model";
import { Task } from "./models/task.model";
import { env } from "./config/env";
import { UserRole } from "./enums/UserRole";
import { TaskStatus } from "./enums/TaskStatus";
import { TaskPriority } from "./enums/TaskPriority";

async function seed() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("Connected to database for seeding...");

    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleared existing data.");

    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin123!",
      role: UserRole.ADMIN,
    });

    // Create member user
    const member = await User.create({
      name: "Member User",
      email: "member@example.com",
      password: "Member123!",
      role: UserRole.MEMBER,
    });

    console.log("Created admin and member users.");

    // Create a sample project has 2 members
    const project = await Project.create({
      name: "Website Redesign",
      description: "Redesigning the company website homepage and product pages",
      owner: admin._id,
      members: [admin._id, member._id],
    });

    console.log("Created sample project.");

    // Create sample tasks for the project with different priorities/statuses
    await Task.create([
      {
        title: "Design homepage wireframe",
        description:
          "Create low-fidelity wireframes for the new homepage layout",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-08-10"),
        project: project._id,
        creator: admin._id,
        assignee: member._id,
      },
      {
        title: "Set up CI/CD pipeline",
        description:
          "Configure GitHub Actions for automated testing and deployment",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-08-15"),
        project: project._id,
        creator: admin._id,
      },
      {
        title: "Write API documentation",
        description: "Document all endpoints using Postman or Swagger",
        status: TaskStatus.DONE,
        priority: TaskPriority.LOW,
        project: project._id,
        creator: admin._id,
        assignee: admin._id,
      },
    ]);

    console.log("Created sample tasks.");

    console.log("\n=========================================");
    console.log("Seeding completed successfully!");
    console.log("=========================================");
    console.log("Admin credentials:");
    console.log("  email:    admin@example.com");
    console.log("  password: Admin123!");
    console.log("-----------------------------------------");
    console.log("Member credentials:");
    console.log("  email:    member@example.com");
    console.log("  password: Member123!");
    console.log("=========================================\n");

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
