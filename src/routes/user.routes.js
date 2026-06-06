import { Router } from "express";
import {
    getProfile,
    getAdminPanel
} from "../controllers/user.controller.js";

import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/profile", authenticateJWT, getProfile);

router.get(
    "/admin",
    authenticateJWT,
    authorizeRole("admin"),
    getAdminPanel
);

export default router;