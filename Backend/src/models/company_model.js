import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const CompanySchema=new Schema({
    CompanyName:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    Companyemail:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
        unique:true,
    },
    CompanyPhonenumber:{
        type:String,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:[true,'password is required'],
    },
    CompanyId:{
           type:String,
           require:[true,'Company is required for a Company '],
    },
    Refreshtoken:{
    type:String
    },    

},{
    timestamps:true
})

CompanySchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

CompanySchema.methods.isPasswordCorrect = async function(Password) {
    // Check if Password is provided
    if (!Password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.Password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Password, this.Password);
};

CompanySchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.EmployeName,
        Email:this.Companymail,
        Employeid:this.CompanyId,
        Phonenumber:this.CompanyPhonenumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    CompanySchema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
            _id:this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        }

export const Company = mongoose.model("Company",CompanySchema)