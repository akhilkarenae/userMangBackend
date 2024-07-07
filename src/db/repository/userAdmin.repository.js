import { UserAdminModel } from "../model/userAdmin.model.js";


export const findOrCreate = async (profile) =>{
    try{
        const user = await UserAdminModel.findOne({ googleId: profile.id });
        if (user) {
        return user;
        }
        const newUser = await UserAdminModel({ googleId: profile.id, email:profile.emails[0].value, displayName: profile.displayName });
        const _newUser = newUser.save();
        return _newUser;
    }catch(err){
        throw new Error(err)
    }
};

