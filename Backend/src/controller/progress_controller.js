// controllers/progress.controller.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Progress } from "../models/Progress_model.js";
import { Course } from "../models/Course_model.js";
import { Certificate } from "../models/Certificate_model.js";
import { Employee } from "../models/Employee_model.js";
// Mark video as completed
const markVideoComplete = asyncHandler(async (req, res) => {
    const { employeeId, courseId, videoTitle } = req.body;

    // Find course and its total videos
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    const totalVideos = course.Videos.map(v => v.title);

    // Find or create progress
    let employeid=await Employee.findOne({EmployeeId:employeeId})
    console.log("the emplye details are ",employeid);
    const id=employeid._id;
    let progress = await Progress.findOne({employee:id, course: courseId });

    if (!progress) {
        progress = await Progress.create({
            employee: id,
            course: courseId,
            videosCompleted: []
        });
    }

    // Avoid duplicate entries
    if (!progress.videosCompleted.includes(videoTitle)) {
        progress.videosCompleted.push(videoTitle);
    }

    // Check if all videos are completed
    const allDone = totalVideos.every(title => progress.videosCompleted.includes(title));

    if (allDone && !progress.isCertified) {
        progress.isCertified = true;

        // Auto-generate certificate
        await Certificate.create({
            CertificateName: course.CourseName + "-completion",
            NumberCertificate: Math.floor(100000 + Math.random() * 900000).toString(),
            CompanyNameCertificate: course.CompanyNamecourse,
            Employeename: employeid._id
        });
    }

    await progress.save();

    res.status(200).json({
        success: true,
        message: allDone ? "Course completed and certificate generated" : "Progress updated",
        progress
    });
});

// Get progress by employee
const getProgressForEmployee = asyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    let employeid=await Employee.findOne({EmployeeId:employeeId})
    console.log("the emplye details are ",employeid);
    const id=employeid._id;
    const progress = await Progress.find({ employee:id })
        .populate("course", "CourseName Duration")
        .lean();

    res.status(200).json({
        success: true,
        data: progress
    });
});

export {
    markVideoComplete,
    getProgressForEmployee
};