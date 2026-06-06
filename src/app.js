import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import userRoutes from "./routes/user.routes.js";

import { sessionConfig } from "./config/session.config.js";
import { initializePassport } from "./config/passport.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

app.use(cookieParser());

app.use(sessionConfig);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1", userRoutes);



app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Hybrid Auth API funcionando correctamente"
    });
});

export default app;