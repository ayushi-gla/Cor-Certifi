// models/progress_model.js
import mongoose, { Schema } from "mongoose";

const ProgressSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    videosCompleted: {
        type: [String], 
        default: []
    },
    isCertified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Progress = mongoose.model("Progress", ProgressSchema);