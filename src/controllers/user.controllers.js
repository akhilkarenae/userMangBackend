import { addFriendService, createUserService, deleteFriendService, deleteUserService, friendsListService, updateUserService, userByIdService, userService } from "../services/user.services.js";
import { validateUser } from "../utils/validation.utils.js";


const createUser = async (req,res,next) =>{
    try{
        const admin = req.user
        console.log(admin, "admin")
        const {email,fullName,phoneNumber} = req.body;
        const validateErrors = validateUser({email,phoneNumber,fullName})
        if (validateErrors.length > 0) {
            throw new Error(validateErrors);
        }
        const newUser = await createUserService({email,phoneNumber,fullName,admin})
        return res.status(200).send({success:true,message:"User created succesfully"})
    }catch(err){
        next(err)
    }
}

const getUsers = async (req,res,next) => {
    try{
        const user = await userService();
        console.log(user, " users")
        return res.status(200).send({success:true,users:user})
    }catch(err){
        next(err)
    }
}

const getUserById = async (req,res,next) =>{
    try{
        const {userId} = req.params;
        if(!userId){
            return res.status(400).send({success:false,message:"userId cannot be empty"})
        }
        const user = await userByIdService({userId})

        return res.status(200).send({success:true,user:user})
    }catch(err){
        next(err)
    }
}

const updateUser = async (req,res,next) =>{
    try{
        const {id,user} = req.body;
        if(!id){
            return res.status(400).send({success:false,message:"user id cannot be empty"})
        }
        const updatedUser = await updateUserService({id,user})
        return res.status(200).send({success:true,message:"User updated successfully"})
    }catch(err){
        next(err)
    }
}

const deleteUser = async ( req,res,next) =>{
    try{
        const id = req.params;
        if(!id){
            return res.status(400).send({success:false,message:"user id cannot be empty"})
        }
        await deleteUserService((id))
        return res.status(200).send({success:true,message:"User deleted successfully"})
    }catch(err){
        next(err)
    }
}

const addFriend = async (req,res,next) =>{
    try{
        const { userId, friend } = req.body;
        if(!userId){
            return res.status(400).send({message:false,message:"User id is not found"})
        }
        if(!friend.friendName || friend.friendName.length<3){
            return res.status(413).send({success:false,message:"friend name length cannot be less than 3 chars"})
        }
        const updatedUser = await addFriendService({userId,friendName:friend.friendName})
        return res.status(200).send({success:true,message:"New friend added successfully"})
    }catch(err){
        next(err)
    }
}

const getfriendlist = async (req,res,next) => {
    try{
        const {userId} =  req.params;
        if(!userId){
            return res.status(400).send({message:false,message:"User id is not found"})
        }
        const friendslist = await friendsListService({userId});
        return res.status(200).send({success:true,friendsList:friendslist})
    }catch(err){
        next(err)
    }
}

const deleteFriend = async (req,res,next) =>{
    try{
        const {userId, friendId} = req.body;
        if(!userId || !friendId){
            return res.status(400).send({message:false,message:"User id and friendName is not found"})
        }
        const deleteFriend = await deleteFriendService({userId, friendId})
        return res.status(200).send({success:true,message:"success"})
    }catch(err){
        next(err)
    }
}

export { createUser, getUsers, getUserById, updateUser, deleteUser, addFriend, getfriendlist, deleteFriend }