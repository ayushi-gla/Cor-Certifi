import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/Employee_model.js";
import { ApiError } from "../utils/ApiError.js";

// EMPLOYEE REGISTRATION
const EmployeeRegister = asyncHandler(async (req, res) => {
    const { EmployeName, EmployeEmail, EmployePhonenumber, Password, EmployeeId, CompanyName } = req.body;

    // Basic validations
    if (!EmployeName?.trim()) throw new ApiError(400, "Name is required");
    if (!EmployeEmail?.trim()) throw new ApiError(400, "Email is required");
    if (!EmployePhonenumber?.trim()) throw new ApiError(400, "Phone number is required");
    if (!Password?.trim()) throw new ApiError(400, "Password is required");
    if (!EmployeeId?.trim()) throw new ApiError(400, "Employee ID is required");

    // Check for existing employee
    const existing = await Employee.findOne({
        $or: [{ EmployeEmail }, { EmployePhonenumber }],
    });

    if (existing) {
        throw new ApiError(409, "Employee already exists with this email or phone");
    }

    // Create employee
    const employee = await Employee.create({
        EmployeName,
        EmployeEmail,
        EmployePhonenumber,
        Password,
        EmployeeId,
        CompanyName,
    });

    const createdEmployee = await Employee.findById(employee._id).select("-Password -Refreshtoken");

    if (!createdEmployee) {
        throw new ApiError(500, "Failed to register employee");
    }

    return res.status(201).json({
        success: true,
        message: "Employee registered successfully",
        data: createdEmployee,
    });
});


// TOKEN GENERATION
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const employee = await Employee.findById(userId);
        const accessToken = employee.generateAcessToken();
        const refreshToken = employee.generateRefreshToken();

        employee.Refreshtoken = refreshToken;
        await employee.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};


// EMPLOYEE LOGIN
const LoginEmployee = asyncHandler(async (req, res) => {
    const { EmployeEmail, Password } = req.body;

    if (!EmployeEmail) throw new ApiError(400, "Email is required");
    if (!Password) throw new ApiError(400, "Password is required");

    const employee = await Employee.findOne({ EmployeEmail });

    if (!employee) {
        throw new ApiError(400, "Employee not found with this email");
    }

    const isMatch = await employee.isPasswordCorrect(Password);

    if (!isMatch) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(employee._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "Login successful",
            data: {
                name: employee.EmployeName,
                employeeId: employee.EmployeeId,
            },
        });
});


// FETCH EMPLOYEE DETAILS
const EmployeeDetail = asyncHandler(async (req, res) => {
    const { employeeName } = req.body;

    if (!employeeName) {
        throw new ApiError(400, "Employee name is required");
    }

    const employee = await Employee.findOne({ EmployeName: employeeName });

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    const employeeDetails = {
        Name: employee.EmployeName,
        Email: employee.EmployeEmail,
        Phone: employee.EmployePhonenumber,
        EmployeeId: employee.EmployeeId,
        Company: employee.CompantName,
    };

    return res.status(200).json({
        success: true,
        message: "Employee details fetched successfully",
        data: employeeDetails,
    });
});


export { EmployeeRegister, LoginEmployee, EmployeeDetail };