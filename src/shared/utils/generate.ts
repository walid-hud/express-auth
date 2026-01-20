import crypto from "crypto"
import jwt from "jsonwebtoken"
function generate_verification_token():{raw_token:string, token_hash:string}{
    const raw_token = crypto.randomBytes(4).toString("hex")
    const token_hash = crypto.createHash("sha256").update(raw_token).digest("hex")
    return {raw_token, token_hash}
}

function generate_jwt_access_token(use_id:string):string{
    return jwt.sign({use_id} , process.env.JWT_SECRET! , {expiresIn:"7d"}) 
}

export {generate_verification_token , generate_jwt_access_token}