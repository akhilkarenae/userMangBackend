import { addFriendService, createUserService, UpdateUserService, userService } from "../services/user.services.js";
import { validateUser } from "../utils/validation.utils.js";


const createUser = async (req,res,next) =>{
    try{
        const {email,fullName,phoneNumber} = req.body;
        const validateErrors = validateUser({email,phoneNumber,fullName})
        if (validateErrors.length > 0) {
            throw new Error(validateErrors);
        }
        // const user = await findUserByEmail(email);
        const newUser = await createUserService({email,phoneNumber,fullName})
        return res.status(200).send({success:true,message:"User created succesfully"})
    }catch(err){
        next(err)
    }
}

const getUsers = async (req,res,next) =>{
    try{
        // const {id} = req.params;
        // if(!id){
        //     return res.status(400).send({success:false,message:"user id cannot be empty"})
        // }

        const user = await userService();
        return res.status(200).send({success:true,users:user})
    }catch(err){
        next(err)
    }
}

const updateUser = async (req,res,next) =>{
    try{
        const {id,email,phoneNumber,fullName} = req.body;
        if(!id){
            return res.status(400).send({success:false,message:"user id cannot be empty"})
        }
        const updatedUser = await UpdateUserService({id,email,phoneNumber,fullName})
        console.log(updatedUser," updated user");
        return res.status(200).send({success:true,message:"User updated successfully"})
    }catch(err){
        next(err)
    }
}

const addFriend = async (req,res,next) =>{
    try{
        const { userId,friendName }= req.body;
        if(friendName.length<3){
            return res.status(413).send({success:false,message:"friend name length cannot be less than 3 chars"})
        }
        const updatedUser = await addFriendService({userId,friendName})
        return res.status(200).send({success:true,message:"New friend added successfully"})
    }catch(err){
        next(err)
    }
}

export { createUser, getUsers, updateUser, addFriend}