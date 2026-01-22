import express, { type Router } from "express";
import signup from "../controllers/auth/signup.controller.js";
import { verify_email } from "../controllers/auth/email_verify.controller.js";
import logout from "../controllers/logout.controller.js";
import check_body from "../middleware/body_checker.midlleware.js";

const auth_router: Router = express.Router();
auth_router.post("/signup",check_body, signup);
auth_router.post("/verify",check_body , verify_email)
auth_router.post("/logout",logout )

export default auth_router;
