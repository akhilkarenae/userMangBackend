import { UserModel } from "../model/users.model.js";


export const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email })
    return user;
}

export  const findUserById = async (id) =>{
    const user = await UserModel.findById({_id:id});
    return user;
}

export const create = async (email,phoneNumber, fullName) =>{
    const user = new UserModel({ email: email, phoneNumber: phoneNumber, fullName:fullName });
    const newUser = user.save();
    return newUser;
}

export const allusers = async () =>{
    const users = await UserModel.find();
    return users
}

export const update = async (id,data) =>{
    const updatedUser = await  UserModel.findByIdAndUpdate({ _id: id }, { ...data },{ new: true })
    return updatedUser;
}