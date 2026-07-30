import { Document, Types } from "mongoose";
import { TaskStatus } from "../enums/TaskStatus";
import { TaskPriority } from "../enums/TaskPriority";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: (typeof TaskStatus)[keyof typeof TaskStatus];
  priority: (typeof TaskPriority)[keyof typeof TaskPriority];
  dueDate?: Date;
  project: Types.ObjectId;
  creator: Types.ObjectId;
  assignee?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
