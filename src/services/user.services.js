import { allusers, create, deleteUser, findUserByEmail, findUserById, update } from "../db/repository/user.repository.js";
import { removeItem } from "../utils/helper.utils.js";


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

const userByIdService = async ({userId}) =>{
    try{
        const user = await findUserById(userId)
        if(!user){
            throw new Error("User not found")
        }
        return user;
    }catch (err) { 
        throw new Error(err);
    }
}

const updateUserService = async ({id,user}) =>{
    try{
        const isUser = await findUserById(id)
        if(!isUser){
            throw new Error("User not found")
        }
        const updatedUser = await update(id,user)
        return updatedUser;
    }catch(err){
        console.log(err, " error from here")
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
        return deletedUser;
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

const deleteFriendService = async ({userId,friendId}) =>{
    try{
        const user = await findUserById(userId)
        if(!user){
            throw new Error("User not found for the given id")
        }

        const friends = user.myFriends;
        console.log(friends)

        const  updatedArray = removeItem(friends,friendId)
        console.log(updatedArray)
        user.myFriends = updatedArray
        const updatedUser = await update(userId,user);
        return updatedUser;
    }catch(err){
        throw new Error(err);
    }
}

export { createUserService, userService, userByIdService, updateUserService, deleteUserService, addFriendService, friendsListService, deleteFriendService }