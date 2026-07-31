import {User} from "../models/user.model";
import {Project} from "../models/project.model";
import {Task} from "../models/task.model";

export async function getDashboardStats() {
  const [
    totalUsers,
    totalProjects,
    totalTasks,

    todoTasks,
    inProgressTasks,
    doneTasks,

    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,

    recentProjects,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments(),

    Project.countDocuments(),

    Task.countDocuments(),

    Task.countDocuments({ status: "todo" }),

    Task.countDocuments({ status: "in_progress" }),

    Task.countDocuments({ status: "done" }),

    Task.countDocuments({ priority: "high" }),

    Task.countDocuments({ priority: "medium" }),

    Task.countDocuments({ priority: "low" }),

    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("owner", "name email"),

    User.find().sort({ createdAt: -1 }).limit(5).select("name email role"),
  ]);

  return {
    totalUsers,
    totalProjects,
    totalTasks,

    todoTasks,
    inProgressTasks,
    doneTasks,

    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,

    recentProjects,
    recentUsers,
  };
}
