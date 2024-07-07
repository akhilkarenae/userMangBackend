import dotenv from "dotenv";

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passport from 'passport';
import { findOrCreate } from '../db/repository/userAdmin.repository.js';

dotenv.config({path:"./.env.userApp"})

export const initializingGoogleStrategy = (passport) => {
    // console.log(process.env.GOOGLE_CLIENT_SECRET,"client seccret")
    // console.log(process.env.GOOGLE_CLIENT_ID,"client seccret")
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await findOrCreate( profile );
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
    }))
}

export const serialize=(passport) =>{
    passport.serializeUser((user,done)=>{
        done(null,user)
    })
}


export const deserialize = (passport) =>{
    passport.deserializeUser((user,done)=>{
        done(null,user)
    })
}