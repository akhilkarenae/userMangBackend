import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { dbConnection } from './db/connection.js';
import routes from './routes/index.js';
import { deserialize, initializingGoogleStrategy, serialize } from './utils/auth.utils.js';
import authRouter from './routes/auth.routes.js';
import { findOrCreate } from './db/repository/userAdmin.repository.js';

dotenv.config({path:"./.env.userApp"})

const allowedOrigins = ['http://localhost:3000','*'];
const corsOptions = {
    origin: allowedOrigins, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors(corsOptions))

dbConnection()

app.use(session({
    secret:"secret123",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

initializingGoogleStrategy(passport)
serialize(passport)
deserialize(passport)



app.get("/auth/google", passport.authenticate("google",{scope: ['profile', 'email']}));
app.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/login"
}))


app.get("/login/sucess",async(req,res) =>{
    if(req.user){
        return res.status(200).send({message:"user login", user:req.user})
    }
    return res.status(400).send({message:"not logged in"})
})


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

app.listen(port, '0.0.0.0',() =>{
    console.log('server running on '+port);
})