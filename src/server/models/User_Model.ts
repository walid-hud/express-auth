import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    name:{type:String , required:true },
    email:{type:String , required:true, unique:true },
    password:{type:String , required:true, unique:true },
    verify_otp:{type:String , default:"" },
    verify_otp_expire:{type:Number , default:0 },
    is_account_verified:{type:Boolean , default:false},
    reset_otp:{type:String , default:"" },
    reset_otp_expire:{type:Number , default:0 },
})

const userModel = mongoose.models.user || mongoose.model("user" , user_schema)

export default userModel
