import crypto from "crypto"
import jwt from "jsonwebtoken"
function generate_verification_token():{raw_token:string, token_hash:string}{
    const raw_token = crypto.randomBytes(4).toString("hex")
    const token_hash = crypto.createHash("sha256").update(raw_token).digest("hex")
    return {raw_token, token_hash}
}

export function compare_verification_token(raw_token:string, token_hash:string):boolean{
    const computed_hash = crypto.createHash("sha256").update(raw_token).digest("hex")
    return computed_hash === token_hash
}

export function hash_verification_code(raw_code:string):string{
    return crypto.createHash("sha256").update(raw_code).digest("hex")
}

function generate_jwt_access_token(use_id:string):string{
    return jwt.sign({use_id} , process.env.JWT_SECRET! , {expiresIn:"7d"}) 
}

export {generate_verification_token , generate_jwt_access_token}