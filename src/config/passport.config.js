import passport from "passport";
import { localStrategy } from "../strategies/local.strategy.js";
import { githubStrategy } from "../strategies/github.strategy.js";
import UserModel from "../models/user.model.js";

export const initializePassport = () => {
    passport.use("local", localStrategy);
    passport.use("github", githubStrategy);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};