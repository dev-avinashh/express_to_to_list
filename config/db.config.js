import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.MONGO_DB_URI

export const connectDatabase = async () =>{
    try {
        await mongoose.connect(uri)
        console.log("connected to database!!!")
        
    } catch (error) {
        console.error('Unable to connect the database',error)
        throw error;

        
    }
}