import { User } from "../models/user.model";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { UserRole } from "../enums/UserRole";
import { RegisterInput, LoginInput } from "../validators/auth.validator";

export async function registerUser(input: RegisterInput) {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const usersCount = await User.countDocuments();
  const role = usersCount === 0 ? UserRole.ADMIN : UserRole.MEMBER;

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password,
    role,
  });

  const token = signToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function loginUser(input: LoginInput) {
  const user = await User.findOne({ email: input.email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(input.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
