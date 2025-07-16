import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/Course_model.js";
import { Company } from "../models/company_model.js";

// CREATE NEW COURSE
const createCourse = asyncHandler(async (req, res) => {
    const {
        CourseName,
        NumberEmployeenrolled,
        CompanyNamecourse,
        Duration,
        Videos
    } = req.body;

    // Basic validations
    if (!CourseName?.trim()) throw new ApiError(400, "Course name is required");
    if (!NumberEmployeenrolled) throw new ApiError(400, "Enrolled employee count is required");
    if (!CompanyNamecourse) throw new ApiError(400, "Company reference is required");
    if (!Duration?.trim()) throw new ApiError(400, "Duration is required");
    if (!Array.isArray(Videos) || Videos.length === 0) {
        throw new ApiError(400, "At least one video must be provided");
    }

    // Validate company existence
    const company = await Company.findOne({ CompanyName: CompanyNamecourse });
    if (!company) {
        throw new ApiError(404, "Referenced company not found");
    }

    // Create course
    const course = await Course.create({
        CourseName,
        NumberEmployeenrolled,
        CompanyNamecourse,
        Duration,
        Videos
    });

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course
    });
});

// GET ALL COURSES
const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find()
        .populate("CompanyNamecourse", "CompantName Companyemail")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: courses
    });
});

// GET SINGLE COURSE BY ID
const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findById(id)
        .populate("CompanyNamecourse", "CompantName Companyemail");

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    res.status(200).json({
        success: true,
        data: course
    });
});

// DELETE COURSE
const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
        throw new ApiError(404, "Course not found to delete");
    }

    res.status(200).json({
        success: true,
        message: "Course deleted successfully"
    });
});

// UPDATE COURSE
const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Course.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
        throw new ApiError(404, "Course not found to update");
    }

    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updated
    });
});

export {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
    updateCourse
};