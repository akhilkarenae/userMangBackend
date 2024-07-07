import express from "express";
import { addFriend, createUser, getUsers, updateUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/create",createUser);
userRouter.get("/",getUsers)
userRouter.put("/update",updateUser)
userRouter.put("/add-friend",addFriend)


export default userRouter;