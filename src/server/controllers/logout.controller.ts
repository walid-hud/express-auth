import type { RequestHandler } from "express";


const logout : RequestHandler = async (_,res)=>{
    res.clearCookie("access-token")
    return res.status(200).json({success:true , msg:"logged out successfully"})
}

export default logout