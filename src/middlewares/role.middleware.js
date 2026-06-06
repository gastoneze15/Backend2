export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.userToken) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado"
            });
        }

        if (req.userToken.role !== role) {
            return res.status(403).json({
                status: "error",
                message: "No autorizado. Rol insuficiente"
            });
        }

        next();
    };
};