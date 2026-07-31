export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;

  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;

  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;

  recentProjects: {
    _id: string;
    name: string;
    owner: {
      name: string;
      email: string;
    };
  }[];

  recentUsers: {
    _id: string;
    name: string;
    email: string;
    role: string;
  }[];
}
