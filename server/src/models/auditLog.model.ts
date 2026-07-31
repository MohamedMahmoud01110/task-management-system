import { Schema, model, Types } from "mongoose";

export interface IAuditLog {
  task: Types.ObjectId;
  changedBy: Types.ObjectId;
  oldStatus: string;
  newStatus: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    changedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    oldStatus: {
      type: String,
      required: true,
    },
    newStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

auditLogSchema.index({ task: 1, createdAt: -1 });

export const AuditLog = model<IAuditLog>("AuditLog", auditLogSchema);
