import express from 'express'
import userRouter from './user.routes.js';

const app = express.Router();

app.use("/user",userRouter)


export default app;