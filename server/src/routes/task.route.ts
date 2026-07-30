import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
  taskFilterSchema,
} from "../validators/task.validator";

// Merge parent route parameters so we can access values like projectId from req.params.
const router = Router({ mergeParams: true });

router.use(protect);

router.post("/", validate(createTaskSchema), taskController.create);
router.get("/", validate(taskFilterSchema, "query"), taskController.getAll);
router.get("/:taskId", taskController.getOne);
router.patch("/:taskId", validate(updateTaskSchema), taskController.update);
router.delete("/:taskId", taskController.remove);

export default router;
