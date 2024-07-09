import { UserModel } from "../model/users.model.js";


export const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email })
    return user;
}

export  const findUserById = async (id) =>{
    const user = await UserModel.findById({_id:id});
    return user;
}

export const create = async (email,phoneNumber, fullName, admin) =>{
    const user = new UserModel({ email: email, phoneNumber: phoneNumber, fullName:fullName, createdBy: admin._id, createdByEmail: admin.email});
    const newUser = user.save();
    return newUser;
}

export const allusers = async () =>{
    const users = await UserModel.find();
    return users
}

export const update = async (id, userData) =>{
    const updatedUser = await  UserModel.findByIdAndUpdate({ _id: id }, { ...userData },{ new: true })
    return updatedUser;
}

export const deleteUser = async (id) => {
    const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
    return deletedUser
}