import express from 'express'
import userRouter from './user.routes.js';
import authRouter from './auth.routes.js';

const app = express.Router();

app.use("/user",userRouter)


export default app;