import express from "express"
import cors from "cors"
import cp from "cookie-parser"
import {config} from "dotenv"
config()
import { connect_db } from "./db/db.js"

const server = express()
server.use(express.json())
server.use(cp())
server.use(cors({credentials:true}))

const port = process.env['SERVER_PORT']
server.listen(port,  async ()=>{
    console.info(`server running on http://localhost:${port}/`);
    const db = await connect_db()
})

