import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

export const localStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return done(null, false, { message: "Usuario no encontrado" });
            }

            if (user.provider !== "local") {
                return done(null, false, { message: "Este usuario utiliza login OAuth" });
            }

            const isValid = await isValidPassword(password, user.password);

            if (!isValid) {
                return done(null, false, { message: "Contraseña incorrecta" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);