import passport from "passport";
import UserModel from "../models/user.model.js";
import { createHash } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                status: "error",
                message: "El usuario ya existe"
            });
        }

        const hashedPassword = await createHash(password);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || "user",
            provider: "local"
        });

        res.status(201).json({
            status: "success",
            message: "Usuario registrado correctamente",
            payload: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                provider: newUser.provider
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

export const login = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: info?.message || "Credenciales inválidas"
            });
        }

        req.login(user, { session: true }, (loginError) => {
            if (loginError) {
                return next(loginError);
            }

            const token = generateToken(user);

            res.cookie("authToken", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60
            });

            return res.status(200).json({
                status: "success",
                message: "Login exitoso",
                token,
                payload: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            });
        });
    })(req, res, next);
};

export const githubCallback = (req, res) => {
    const token = generateToken(req.user);

    res.cookie("authToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60
    });

    res.status(200).json({
        status: "success",
        message: "Login con GitHub exitoso",
        token,
        payload: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }
    });
};

export const logout = (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({
                status: "error",
                message: "Error al cerrar sesión"
            });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.clearCookie("authToken");

            res.status(200).json({
                status: "success",
                message: "Logout realizado correctamente"
            });
        });
    });
};