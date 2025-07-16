import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema({
    CertificateName: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    NumberCertificate:{
        type:String,
        require:true,
    },
    CompanyNameCertificate: {
       type:String,
        required: true,
    },
    Employeename:{
        type:Schema.Types.ObjectId,
         ref:"Employee",
         required: true,
    }
}, {
    timestamps: true
});

export const Certificate = mongoose.model("Certificate", CertificateSchema);