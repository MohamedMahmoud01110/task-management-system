import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
} from "../validators/project.validator";

const router = Router();

router.use(protect);

router.post("/", validate(createProjectSchema), projectController.create);
router.get("/", projectController.getAll);
router.get("/:id", projectController.getOne);
router.patch("/:id", validate(updateProjectSchema), projectController.update);
router.delete("/:id", projectController.remove);

router.post(
  "/:id/members",
  validate(addMemberSchema),
  projectController.addMember,
);
router.delete("/:id/members/:userId", projectController.removeMember);

export default router;
