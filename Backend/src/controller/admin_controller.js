import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/Admin_model.js";
import { Employee } from "../models/Employee_model.js";
import { Course } from "../models/Course_model.js";
// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { AdminName, AdminEmail, AdminPhone, Password, AdminId } = req.body;

    if (!AdminName || !AdminEmail || !AdminPhone || !Password || !AdminId) {
        throw new ApiError(400, "All fields are required");
    }

    const existing = await Admin.findOne({ AdminEmail });

    if (existing) {
        throw new ApiError(409, "Admin with this email already exists");
    }

    const admin = await Admin.create({
        AdminName,
        AdminEmail,
        AdminPhone,
        Password,
        AdminId
    });

    res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: {
            id: admin._id,
            name: admin.AdminName,
            email: admin.AdminEmail
        }
    });
});

// Generate Tokens
const generateAdminTokens = async (adminId) => {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.RefreshToken = refreshToken;
    await admin.save();

    return { accessToken, refreshToken };
};

// Login Admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { AdminEmail, Password } = req.body;

    if (!AdminEmail || !Password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await Admin.findOne({ AdminEmail });

    if (!admin) throw new ApiError(404, "Admin not found");

    const isMatch = await admin.isPasswordCorrect(Password);
    if (!isMatch) throw new ApiError(401, "Incorrect password");

    const { accessToken, refreshToken } = await generateAdminTokens(admin._id);

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "Login successful",
            data: {
                name: admin.AdminName,
                adminId: admin.AdminId
            }
        });
});

// Get Admin Details
const getAdminDetails = asyncHandler(async (req, res) => {
    const { adminName } = req.body;

    const admin = await Admin.findOne({ AdminName: adminName });

    if (!admin) throw new ApiError(404, "Admin not found");

    res.status(200).json({
        success: true,
        data: {
            name: admin.AdminName,
            email: admin.AdminEmail,
            phone: admin.AdminPhone,
            adminId: admin.AdminId
        }
    });
});
// GET ALL SYSTEM DATA (EMPLOYEES, COMPANIES, COURSES, CERTIFICATES)
const getSystemOverview = asyncHandler(async (req, res) => {
    const employees = await Employee.find().select("-Password -Refreshtoken");
    const companies = await Company.find().select("-Password -Refreshtoken");
    const courses = await Course.find()
        .populate("CompanyNamecourse", "CompantName Companyemail")
        .lean();
    const certificates = await Certificate.find()
        .populate("CompanyNameCertificate", "CompantName Companyemail")
        .populate("Employeename", "EmployeName EmployeEmail EmployeeId")
        .lean();

    res.status(200).json({
        success: true,
        message: "System overview fetched successfully",
        data: {
            employees,
            companies,
            courses,
            certificates
        }
    });
});
export { registerAdmin, loginAdmin, getAdminDetails, getSystemOverview };