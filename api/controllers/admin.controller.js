import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res)=>{
    res.json({
        message:"API working",
    })
}

export const  users = async(req,res,next)=>{
    try {
        const totalUsers = await User.find({ isAdmin: false })
        console.log(totalUsers)
         res.status(200).json({totalUsers})
    } catch (error) {
        next(error)
    }
   
}

export const deleteUser = async(req,res,next)=>{
   /* if(req.user.id !== req.params.id){
       
        return next(errorHandler(401,'you can delete only your account'))
    }*/
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req,res,next)=>{
  
    try {
        const userId = req.params.id;
        const { username,email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId,{$set:{username:username,email:email}},{new:true});
        res.status(200).json({ success: true, message: 'User updated successfully',})
        // const {password,...rest} = updatedUser._doc;
        res.status(200).json({updatedUser});

    } catch (error) {
        next(error)
    }
}

export const  data = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        console.log(user._doc)
         res.status(200).json({user})
    } catch (error) {
        next(error)
    }
   
}

export const addUser = async(req,res,next)=>{
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created sucessfully" });
    } catch (error) {
      next(error);
    }
}