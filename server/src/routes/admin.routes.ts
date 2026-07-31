import { Router } from "express";

import { protect } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

import { getDashboard } from "../controllers/admin.controller";

const router = Router();

router.use(protect);

router.use(requireRole("admin"));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator endpoints
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *       403:
 *         description: Forbidden
 */
router.get("/dashboard", getDashboard);
export default router;
