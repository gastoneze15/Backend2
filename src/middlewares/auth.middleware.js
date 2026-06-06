import { verifyToken } from "../utils/jwt.js";

export const authenticateJWT = (req, res, next) => {
    try {
        let token = null;

        if (req.cookies?.authToken) {
            token = req.cookies.authToken;
        }

        const authHeader = req.headers.authorization;

        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado. Token no proporcionado"
            });
        }

        const decoded = verifyToken(token);

        req.userToken = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado"
        });
    }
};