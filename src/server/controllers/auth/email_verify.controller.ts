import type { RequestHandler } from "express";
import userModel, { type IUser } from "../../models/User.model.js";
import { hash_verification_code } from "../../../shared/utils/generate.js";
import { send_welcome_email } from "../../services/email.service.js";

export const verify_email: RequestHandler = async (req, res, next) => {
  try {
    let { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }
    const verification_code = code as string;
    const hashed_code = hash_verification_code(verification_code);
    const user = await userModel.findOne({
      verification_token_hash: hashed_code,
      verification_token_expire_at:{$gt:Date.now()}
    });
    if(!user){
        return res.status(400).json({success:false,msg:"Verification token invalid or expired"})
    }
    user.is_account_verified = true;
    user.verification_token_hash = null;
    user.verification_token_expire_at = null;
    await user.save();
    await send_welcome_email(user)
    return res.status(200).json({ success: true, msg: "Email verified successfully" });

  } catch (e) {
    if (e instanceof Error) {
      const err = e as Error; 
      res.status(400).json({ success: false, msg: err.message });
      console.error(e.message);
    } else {
      res.status(400).json({ success: false, msg: e });
      console.error(e);
    }
  }
};
