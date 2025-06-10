import { Request , Response } from "express";
import bcrypt from 'bcrypt'
import { createUserServices, getUserByEmailServices } from "./auth.service";
import jwt from "jsonwebtoken";
//register Login
export const createUser = async(req:Request , res:Response) =>{
        const user = req.body;
    try {  
    if (!user.Full_Name || !user.Contact_Phone  || !user.Email  || !user.Confirmation_Code || !user.Password ) {
        res.status(400).json({ error: "All fields 🖇️ are required" });
        return;
        
    }

    //generate hashed passwors

         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(user.Password , salt)
         console.log ("🚀 ~ created ~hashedPassword:" , hashedPassword)
         user.Password = hashedPassword

          const newUser = await createUserServices(user)
          res.status(201).json({message:newUser})
    } catch (error : any) {
        res.status(500).json({error:error.message || "failed to create user"})        
}
}

//login user
export const loginUser =async(req:Request , res:Response) =>{
    const user = req.body;

    try {
        
        const existingUer =await getUserByEmailServices(user.email);
    if(!existingUer){
        res.status(404).json({error:"User not Found 🔎"});
        return;
    }

    //compare the password
    const isMatch = bcrypt.compareSync(user.password , existingUer.Password)
    if(!isMatch){
        res.status(401).json({error:"invalid password ⛔⛔"});
        return;
    }
          
    //generate token
    let payload = {
        User_Id:existingUer.User_Id,
        Email:existingUer.Email,
        FullName : existingUer.Full_Name,

        //expire
        exp: Math.floor(Date.now()/1000) +(60*60)  //token expire in an hour
    }

    let secret = process.env.JWT_SECRET as string
    const token = jwt.sign(payload , secret)
    res.status(200).json({token , User_Id:existingUer.User_Id , Email:existingUer.Email , FullName:existingUer.Full_Name})

    } catch (error:any) {
        res.status(500).json({error:error.message || "failed to login"})
        
    }
}
