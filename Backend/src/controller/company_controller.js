import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Company } from "../models/company_model.js";

// REGISTER COMPANY
const registerCompany = asyncHandler(async (req, res) => {
    const { CompantName, Companyemail, CompanyPhonenumber, Password, CompanyId } = req.body;

    // Validations
    if (!CompantName?.trim()) throw new ApiError(400, "Company Name is required");
    if (!Companyemail?.trim()) throw new ApiError(400, "Email is required");
    if (!CompanyPhonenumber?.trim()) throw new ApiError(400, "Phone number is required");
    if (!Password?.trim()) throw new ApiError(400, "Password is required");
    if (!CompanyId?.trim()) throw new ApiError(400, "Company ID is required");

    // Check for existing company
    const existing = await Company.findOne({
        $or: [{ Companyemail }, { CompanyPhonenumber }]
    });

    if (existing) {
        throw new ApiError(409, "Company already exists with this email or phone number");
    }

    // Create company
    const company = await Company.create({
        CompantName,
        Companyemail,
        CompanyPhonenumber,
        Password,
        CompanyId
    });

    const createdCompany = await Company.findById(company._id).select("-Password -Refreshtoken");

    if (!createdCompany) {
        throw new ApiError(500, "Failed to register company");
    }

    return res.status(201).json({
        success: true,
        message: "Company registered successfully",
        data: createdCompany
    });
});

// TOKEN GENERATOR
const generateCompanyTokens = async (companyId) => {
    try {
        const company = await Company.findById(companyId);
        const accessToken = company.generateAcessToken();
        const refreshToken = company.generateRefreshToken();

        company.Refreshtoken = refreshToken;
        await company.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens");
    }
};

// LOGIN COMPANY
const loginCompany = asyncHandler(async (req, res) => {
    const { Companyemail, Password } = req.body;

    if (!Companyemail) throw new ApiError(400, "Email is required");
    if (!Password) throw new ApiError(400, "Password is required");

    const company = await Company.findOne({ Companyemail });

    if (!company) throw new ApiError(404, "Company not found with this email");

    const isPasswordMatch = await company.isPasswordCorrect(Password);

    if (!isPasswordMatch) throw new ApiError(401, "Incorrect password");

    const { accessToken, refreshToken } = await generateCompanyTokens(company._id);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "Login successful",
            data: {
                name: company.CompantName,
                companyId: company.CompanyId
            }
        });
});

// COMPANY DETAILS FETCH
const companyDetail = asyncHandler(async (req, res) => {
    const { companyName } = req.body;

    if (!companyName) {
        throw new ApiError(400, "Company name is required");
    }

    const company = await Company.findOne({ CompantName: companyName });

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    const companyDetails = {
        Name: company.CompantName,
        Email: company.Companyemail,
        Phone: company.CompanyPhonenumber,
        CompanyId: company.CompanyId,
    };

    return res.status(200).json({
        success: true,
        message: "Company details fetched successfully",
        data: companyDetails
    });
});

export { registerCompany, loginCompany, companyDetail };