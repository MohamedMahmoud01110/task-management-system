import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  role: string;
}

export function signToken(userId: Types.ObjectId, role: string): string {
  const payload: JwtPayload = { userId: userId.toString(), role };
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
