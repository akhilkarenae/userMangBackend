import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';

import { dbConnection } from './db/connection.js';
import routes from './routes/index.js';

dotenv.config({path:"./.env.userApp"})

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors(corsOptions))

dbConnection()

app.use("/api",routes)

app.get("/test",(req,res)=>{
    res.status(200).send({message:"hi"})
})

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err?.message || "some Internal error";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    })
})

app.listen(port, () =>{
    console.log('server running on '+port);
})