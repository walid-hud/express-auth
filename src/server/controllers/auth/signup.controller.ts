import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import { is_valid_email } from "../../../shared/utils/validate.js";
import userModel from "../../models/User.model.js";
import {
  generate_jwt_access_token,
  generate_verification_token,
} from "../../../shared/utils/generate.js";
import { send_verification_email } from "../../services/email.service.js";

const signup: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("invalid request");
    }
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new Error("all fields are required");
    }

    if (!is_valid_email(email)) {
      throw new Error("invalid email");
    }

    const user_already_exists = await userModel.findOne({ email });
    if (user_already_exists) {
      return res
        .status(400)
        .json({ success: false, message: "email already used" });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const { raw_token, token_hash } = generate_verification_token();
    const user = new userModel({
      name,
      email,
      password: hashed_password,
      verification_token_hash: token_hash,
      verification_token_expire_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    await user.save();

    const token = generate_jwt_access_token(user._id.toString());
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.ENV === "prod" ? true : false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      msg: "user created successfully",
      user: { ...user.toObject(), password: null },
    });

    await send_verification_email(user , raw_token)
  } catch (e) {
    if (e instanceof Error) {
      const err = e as Error; // some typescript BS 🫩
      res.status(400).json({ success: false, msg: err.message });
      console.error(e.message);
    } else {
      res.status(400).json({ success: false, msg: e });
      console.error(e);
    }
  }
};

export default signup;
