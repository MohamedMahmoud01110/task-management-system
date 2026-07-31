import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
  taskFilterSchema,
} from "../validators/task.validator";
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */
// Merge parent route parameters so we can access values like projectId from req.params.
const router = Router({ mergeParams: true });

router.use(protect);
/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", validate(createTaskSchema), taskController.create);
/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     summary: Get project tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", validate(taskFilterSchema, "query"), taskController.getAll);
/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task retrieved
 */
router.get("/:taskId", taskController.getOne);
/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch("/:taskId", validate(updateTaskSchema), taskController.update);
/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:taskId", taskController.remove);
/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}/audit-log:
 *   get:
 *     summary: Get task status change history
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Audit log retrieved
 */
router.get("/:taskId/audit-log", taskController.getAuditLog);
export default router;
