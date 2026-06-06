export const getProfile = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Acceso autorizado al perfil",
        user: {
            userId: req.userToken.userId,
            role: req.userToken.role
        }
    });
};

export const getAdminPanel = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Acceso autorizado al panel de administración",
        user: {
            userId: req.userToken.userId,
            role: req.userToken.role
        }
    });
};