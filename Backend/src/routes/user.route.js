import express from "express";
import { EmployeeRegister,EmployeeDetail,LoginEmployee } from "../controller/employee_controller.js";
import {
    registerCompany,
    loginCompany,
    companyDetail
} from "../controller/company_controller.js";

import {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
    updateCourse
} from "../controller/course_controller.js";
import {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    deleteCertificate,
    updateCertificate
} from "../controller/certificate_controller.js";
import {
    registerAdmin,
    loginAdmin,
    getAdminDetails,
    getSystemOverview
} from "../controller/admin_controller.js";


import {
    markVideoComplete,
    getProgressForEmployee
} from "../controller/progress_controller.js";




const router = express.Router();

router.post("/register/employee", EmployeeRegister);
router.post("/login/employee", LoginEmployee);
router.post("/details/employee", EmployeeDetail);
router.post("/register/company", registerCompany);
router.post("/login/company", loginCompany);
router.post("/details/company", companyDetail);
router.post("/course/create", createCourse);
router.get("/course/all", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);
router.post("/create", createCertificate);
router.get("/certificate/all", getAllCertificates);
router.get("/getcertificateby:id", getCertificateById);
router.delete("/:id", deleteCertificate);
router.put("/:id", updateCertificate);

router.post("/login/admin", loginAdmin);
router.post("/details/admin", getAdminDetails);
router.post("/register/admin", registerAdmin);
router.get("/system-overview/admin", getSystemOverview); 


router.post("/progress/mark-complete", markVideoComplete); // body: employeeId, courseId, videoTitle
router.get("/progress/:employeeId", getProgressForEmployee);
export default router;