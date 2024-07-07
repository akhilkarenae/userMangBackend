import mongoose from 'mongoose';
import dotenv from 'dotenv'


const result = dotenv.config({path:"./.env_userApp"})

export const dbConnection = async()=>{
    try{
        const client = await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 60000
        })
        console.log('bd connected') 
    }catch(error)   {
        throw new Error(error);
    }
}