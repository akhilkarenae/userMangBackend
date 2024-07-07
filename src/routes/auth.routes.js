import express from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}));
authRouter.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/login"
}))


export default authRouter