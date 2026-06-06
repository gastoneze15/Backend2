import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";

dotenv.config();

export const githubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "test",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "test",
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email =
                profile.emails && profile.emails.length > 0
                    ? profile.emails[0].value
                    : `${profile.username}@github.local`;

            let user = await UserModel.findOne({ email });

            if (!user) {
                user = await UserModel.create({
                    firstName: profile.displayName || profile.username,
                    lastName: "GitHub",
                    email,
                    password: null,
                    role: "user",
                    provider: "github",
                    githubId: profile.id
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);