import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
} from "../validators/project.validator";
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */
const router = Router();

router.use(protect);
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/", validate(createProjectSchema), projectController.create);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all accessible projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", projectController.getAll);
/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 */
router.get("/:projectId", projectController.getOne);
/**
 * @swagger
 * /projects/{projectId}:
 *   patch:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project updated
 */
router.patch(
  "/:projectId",
  validate(updateProjectSchema),
  projectController.update,
);
/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.delete("/:projectId", projectController.remove);
/**
 * @swagger
 * /projects/{projectId}/members:
 *   post:
 *     summary: Add member to project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member added
 */
router.post(
  "/:projectId/members",
  validate(addMemberSchema),
  projectController.addMember,
); 
/**
 * @swagger
 * /projects/{projectId}/members:
 *   get:
 *     summary: Get project members
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Members retrieved
 */

router.get("/:projectId/members", projectController.getMembers);
/**
 * @swagger
 * /projects/{projectId}/members/{userId}:
 *   delete:
 *     summary: Remove member
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member removed
 */
router.delete("/:projectId/members/:userId", projectController.removeMember);

export default router;
