import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Certificate } from "../models/Certificate_model.js";
import { Company } from "../models/company_model.js";
import { Employee } from "../models/Employee_model.js";

// CREATE CERTIFICATE
const createCertificate = asyncHandler(async (req, res) => {
    const { CertificateName, NumberCertificate, CompanyNameCertificate, Employeename } = req.body;

    // Validation
    if (!CertificateName?.trim()) throw new ApiError(400, "Certificate name is required");
    if (!NumberCertificate?.trim()) throw new ApiError(400, "Certificate number is required");
    if (!CompanyNameCertificate) throw new ApiError(400, "Company reference is required");
    if (!Employeename) throw new ApiError(400, "Employee reference is required");

    // Check if company exists
    let companynameid=await Company.findOne({CompanyName:CompanyNameCertificate})
    console.log("the company id is ",companynameid);
    const id=companynameid._id;
    const company = await Company.findById(id);
    if (!company) throw new ApiError(404, "Referenced company not found");

    // Check if employee exists
    const employee = await Employee.findById(Employeename);
    if (!employee) throw new ApiError(404, "Referenced employee not found");

    // Create certificate
    const certificate = await Certificate.create({
        CertificateName,
        NumberCertificate,
        CompanyNameCertificate,
        Employeename
    });

    res.status(201).json({
        success: true,
        message: "Certificate created successfully",
        data: certificate
    });
});

// GET ALL CERTIFICATES
const getAllCertificates = asyncHandler(async (req, res) => {
    const certificates = await Certificate.find()
        .populate("CompanyNameCertificate", "CompantName Companyemail")
        .populate("Employeename", "EmployeName EmployeEmail EmployeeId");

    res.status(200).json({
        success: true,
        data: certificates
    });
});

// GET CERTIFICATE BY ID
const getCertificateById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const certificate = await Certificate.findById(id)
        .populate("CompanyNameCertificate", "CompantName Companyemail")
        .populate("Employeename", "EmployeName EmployeEmail EmployeeId");

    if (!certificate) {
        throw new ApiError(404, "Certificate not found");
    }

    res.status(200).json({
        success: true,
        data: certificate
    });
});

// DELETE CERTIFICATE
const deleteCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await Certificate.findByIdAndDelete(id);

    if (!deleted) {
        throw new ApiError(404, "Certificate not found to delete");
    }

    res.status(200).json({
        success: true,
        message: "Certificate deleted successfully"
    });
});

// UPDATE CERTIFICATE
const updateCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Certificate.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
        throw new ApiError(404, "Certificate not found to update");
    }

    res.status(200).json({
        success: true,
        message: "Certificate updated successfully",
        data: updated
    });
});

export {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    deleteCertificate,
    updateCertificate
};