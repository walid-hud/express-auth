import express, { type Router } from "express";
import signup from "../controllers/auth/signup.controller.js";

const auth_router: Router = express.Router();
auth_router.post("/signup", signup);

export default auth_router;
