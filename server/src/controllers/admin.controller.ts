import { Request, Response } from "express";
import { getDashboardStats } from "../services/admin.service";

export const getDashboard = async (_req: Request, res: Response) => {
  const data = await getDashboardStats();

  res.status(200).json({
    success: true,
    data,
  });
};
