import mongoose from "mongoose";
import type {Mongoose} from "mongoose"

const connect_db = async () :Promise<Mongoose> =>{
    try {
        return await mongoose.connect(`${process.env['MONGODB_URI']}/auth`)
    } catch (error) {
        console.error("couldn't connect to db")
        process.exit(1)
    }
}

export {connect_db}

