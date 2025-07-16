import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const EmployeeSchema=new Schema({
    EmployeName:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    EmployeEmail:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
        unique:true,
    },
    EmployePhonenumber:{
        type:String,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:[true,'password is required'],
    },
    EmployeeId:{
           type:String,
           require:[true,'Employee is required for a Employee '],
    },
    CompanyName:{
       type:String,
       require:true,
    },
    Refreshtoken:{
    type:String
    },    

},{
    timestamps:true
})

EmployeeSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

EmployeeSchema.methods.isPasswordCorrect = async function(Password) {
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

EmployeeSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.EmployeName,
        Email:this.EmployeEmail,
        Employeid:this.EmployeeId,
        Phonenumber:this.EmployePhonenumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    EmployeeSchema.methods.generateRefreshToken=function(){
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

export const Employee = mongoose.model("Employee",EmployeeSchema)