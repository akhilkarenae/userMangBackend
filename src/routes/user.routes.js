import express from "express";
import { addFriend, createUser, deleteFriend, deleteUser, getfriendlist, getUserById, getUsers, updateUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log(req.isAuthenticated(), " is aurhed")
    res.status(401).json({ message: 'You need to be authenticated to access this route.' });
};

userRouter.post("/create", isAuthenticated, createUser);
userRouter.get("/", isAuthenticated, getUsers)
userRouter.put("/update", isAuthenticated, updateUser)
userRouter.get("/:userId", isAuthenticated, getUserById)
userRouter.delete("/delete/:id",isAuthenticated, deleteUser)

userRouter.put("/add-friend", addFriend )
userRouter.get("/:userId/friends", getfriendlist )
userRouter.put("/delete-friend", isAuthenticated, deleteFriend)


export default userRouter;