export const getSession = (req, res) => {
    res.status(200).json({
        status: "success",
        sessionID: req.sessionID,
        session: req.session,
        user: req.user || null
    });
};