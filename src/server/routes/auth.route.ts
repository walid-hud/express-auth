import express, { type Router } from "express";
import signup from "../controllers/auth/signup.controller.js";
import { verify_email } from "../controllers/auth/email_verify.controller.js";

const auth_router: Router = express.Router();
auth_router.post("/signup", signup);
auth_router.post("/verify" , verify_email)

export default auth_router;
