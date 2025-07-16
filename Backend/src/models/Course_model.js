import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
    CourseName: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    NumberEmployeenrolled:{
        type:Number,
        require:true,
    },
    CompanyNamecourse: {
        type:String,
        required: true,
    },
    Duration: {
        type: String,
        required: true,
    },
    Videos: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            duration: { type: String }, 
            description: { type: String }, 
        }
    ]
}, {
    timestamps: true
});

export const Course = mongoose.model("Course", CourseSchema);