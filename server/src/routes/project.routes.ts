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
router.get("/:projectId", projectController.getOne);
router.patch("/:projectId", validate(updateProjectSchema), projectController.update);
router.delete("/:projectId", projectController.remove);

router.post(
  "/:projectId/members",
  validate(addMemberSchema),
  projectController.addMember,
);

router.get(
  "/:projectId/members",
  projectController.getMembers,
);
router.delete("/:projectId/members/:userId", projectController.removeMember);

export default router;
