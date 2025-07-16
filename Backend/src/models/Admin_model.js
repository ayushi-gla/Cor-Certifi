// models/admin_model.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminSchema = new Schema({
    AdminName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    AdminEmail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    AdminPhone: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    AdminId: {
        type: String,
        required: true
    },
    RefreshToken: {
        type: String
    }
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

AdminSchema.methods.isPasswordCorrect = async function (Password) {
    return await bcrypt.compare(Password, this.Password);
};

AdminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            name: this.AdminName,
            email: this.AdminEmail,
            adminId: this.AdminId
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

AdminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const Admin = mongoose.model("Admin", AdminSchema);