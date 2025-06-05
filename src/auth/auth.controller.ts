import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { createUserServices, getUserByEmailService } from "./auth.service";
import { error } from "console";
import jwt from "jsonwebtoken"


//register login
export const createUser =async (req:Request, res:Response) =>{

    try {
         const user  = req.body;
    if (!user.fullName || !user.email || !user.password) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }


    //generate hashed password
    const salt = bcrypt.genSaltSync(10);
     const hashedPassword = bcrypt.hashSync(user.password,salt)
    user.password = hashedPassword

     const newUser = await createUserServices(user)
     res.status(201).json({message:newUser})

    } catch (error:any) {
        res.status(500).json({error:error.message || "failed to create user 🚫🚫"})
    }
}

//login 

//finding the user
export const loginUser =async(req:Request , res:Response) =>{
    const user =req.body;
    try {

         const existingUser = await getUserByEmailService(user.email)
        if (!existingUser){
            res.status(404).json({error:'user not found 😢😢'});
            return;

        }

        //if found now we compare the pass
        const isMatch = bcrypt.compareSync(user.password, existingUser.password)
        if(!isMatch){
            res.status(401).json({error:'invalid password 🙅‍♂️🙅‍♂️'});
            return;
        }

        //Generate Tokken

        let payload ={
            userId: existingUser.userId,
            email: existingUser.email,
            fullName: existingUser.fullName,
            userType: existingUser.userType,

            
        //expiring of the tocken
        exp: Math.floor(Date.now()/1000) + (60*60) //toccken expires within 1 hour
        
        }
        let secret = process.env.JWT_SECRET as string;

        const token = jwt.sign(payload ,secret)


        res.status(200).json({token , userId:existingUser.userId , email:existingUser.email , fullName:existingUser.fullName , userType:existingUser.userType})

        
    } catch (error:any) {

        res.status(500).json({error:error.message || " oops 😢 failed to log in"})

    }


    }  