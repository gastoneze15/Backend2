import app from "./app.js";
import { connectDB } from "./config/database.config.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();