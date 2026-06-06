import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: function () {
                return this.provider === "local";
            }
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        provider: {
            type: String,
            enum: ["local", "github"],
            default: "local"
        },
        githubId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;