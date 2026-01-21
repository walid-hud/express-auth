import express , {type Express} from "express"
import cors from "cors"
import cp from "cookie-parser"
import {config} from "dotenv"
config()
import auth_router from "./routes/auth.route.js"
import { connect_db } from "./db/db.js"
import check_body from "./middleware/body_checker.midlleware.js"

const server : Express = express()
server.use(express.json())
server.use(cp())
server.use(cors({credentials:true}))


server.use("/api/auth" , check_body , auth_router)

const port = process.env['SERVER_PORT']
server.listen(port,  async ()=>{
    await connect_db()
    console.info(`server running on http://localhost:${port}/`);
})


export default server
