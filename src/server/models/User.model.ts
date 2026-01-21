import { Document } from "mongoose";
import mongoose from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  last_login: Date;
  is_account_verified: boolean;
  verification_token_hash?: string| null;
  verification_token_expire_at?: Date | null;
  reset_password_token?: string | null;
  reset_password_expire_at?: Date | null;
}
const user_schema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    last_login:{type:Date, default:Date.now},
    is_account_verified: { type: Boolean, default: false },
    verification_token_hash: { type: String },
    verification_token_expire_at: { type: Date,  },
    reset_password_token: { type: String},
    reset_password_expire_at: { type: Date},
  },
  { timestamps: true },
);

const userModel =  mongoose.model("User", user_schema);
export default userModel;
