import { Router } from "express";
import passport from "passport";
import {
    register,
    login,
    githubCallback,
    logout
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api/v1/auth/github/failure"
    }),
    githubCallback
);

router.get("/github/failure", (req, res) => {
    res.status(401).json({
        status: "error",
        message: "Error en autenticación con GitHub"
    });
});

router.post("/logout", logout);

export default router;