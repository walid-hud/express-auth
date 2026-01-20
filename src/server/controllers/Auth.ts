import type {RequestHandler} from "express"
const register :RequestHandler =  async (req , res)=>{
    const {name,email,password} = req.body
    
}