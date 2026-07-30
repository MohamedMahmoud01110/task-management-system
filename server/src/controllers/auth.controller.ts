import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await registerUser(req.body);
    res.status(201).json({ success: true, message: "User registered successfully" ,data});
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await loginUser(req.body);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    next(err);
  }
}
