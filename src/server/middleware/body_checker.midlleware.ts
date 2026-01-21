import type { RequestHandler } from "express";

const check_body : RequestHandler =  (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({success:false , msg:"Request body cannot be empty" });
  }
  next();
}

export default check_body