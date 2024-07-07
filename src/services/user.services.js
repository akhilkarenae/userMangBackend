import { allusers, create, deleteUser, findUserByEmail, findUserById, update } from "../db/repository/user.repository.js";


const createUserService = async ({email, phoneNumber, fullName, admin}) => {
    try {
        const user = await findUserByEmail(email)
        if(user){
            throw new Error("User exists")
        }
        const newUser = await create(email, phoneNumber, fullName, admin)
        return newUser;
    } catch (err) { 
        throw new Error(err);
    }
}

const userService = async () =>{
    try{
        const users = await allusers();
        return users;
    }catch (err) { 
        throw new Error(err);
    }
}

const UpdateUserService = async ({id,email,phoneNumber,fullName}) =>{
    try{
        const user = await findUserById(id)
        if(!user){
            throw new Error("User not found")
        }
        const data = {}
        if(email){
            data.email = email
        }
        if(phoneNumber){
            data.phoneNumber=phoneNumber
        }
        if(fullName){
            data.fullName=fullName
        }
        const updatedUser = await update(id,data)
        return updatedUser;
    }catch(err){
        throw new Error(err);
    }
}

const deleteUserService = async ({id}) =>{
    try{
        const user = await findUserById(id)
        if(!user){
            throw new Error("User not found")
        }
        const deletedUser = await deleteUser(id);
        return deleteUser
    }catch(err){
        throw new Error(err);
    }
}

const addFriendService = async ({userId,friendName}) =>{
    try{
        const user = await findUserById(userId)
        if(!user){
            throw new Error("User not found for the given id")
        }
        const data = {};
        const {myFriends} = user;
        myFriends.push({name:friendName});
        data.myFriends=myFriends
        const updateduser = await update(userId,data);
        return updateduser;
    }catch(err){
        throw new Error(err);
    }
}

const friendsListService = async ({userId}) =>{
    try{
        const user = await findUserById(userId)
        if(!user){
            throw new Error("User not found for the given id")
        }
        const { myFriends } = user;
        return myFriends;
    }catch(err){
        throw new Error(err);
    }
}

export { createUserService, userService, UpdateUserService, deleteUserService, addFriendService, friendsListService }