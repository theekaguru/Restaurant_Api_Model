import { Request , Response } from "express";
import bcrypt from 'bcrypt'
import { createUserServices, getUserByEmailServices } from "./auth.service";
import jwt from "jsonwebtoken";
import { sendNotificationEmail } from "../middleware/googleMailer";
//register Login
export const createUser = async(req:Request , res:Response) =>{
        const user = req.body;
    try {  
    if (!user.Full_Name || !user.Contact_Phone  || !user.Email  || !user.Confirmation_Code || !user.Password ) {
        res.status(400).json({ error: "All fields 🖇️ are required" });
        return;
    }

    //generate hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.Password , salt)
    console.log ("🚀 ~ created ~hashedPassword:" , hashedPassword)
    user.Password = hashedPassword

    try {
        const newUser = await createUserServices(user)
        const result = await sendNotificationEmail(user.Email ,"Account created Successfully", "Welcome to our Restaurant 👻👻✔️") 
        res.status(201).json({message:newUser , emailMessage:result})
    } catch (error: any) {
        if (error.message === "User with this email already exists") {
            res.status(409).json({ error: "Email already registered. Please use a different email address." });
            return;
        }
        throw error; // Re-throw other errors to be caught by outer catch block
    }
    } catch (error : any) {
        res.status(500).json({error:error.message || "failed to create user"})        
    }
}

//login user
export const loginUser = async (req: Request, res: Response) => {
    const user = req.body;

    try {
        // Use the correct field names (capitalized)
        const existingUser = await getUserByEmailServices(user.Email);
        if (!existingUser) {
            res.status(404).json({ error: "User not Found 🔎" });
            return;
        }

        // Compare the password
        const isMatch = bcrypt.compareSync(user.Password, existingUser.Password);
        if (!isMatch) {
            res.status(401).json({ error: "invalid password ⛔⛔" });
            return;
        }

        // Generate token
        let payload = {
            User_Id: existingUser.User_Id,
            Email: existingUser.Email,
            FullName: existingUser.Full_Name,
            userType: existingUser.User_Type,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        let secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(payload, secret);
        res.status(200).json({
            token,
            User_Id: existingUser.User_Id,
            Email: existingUser.Email,
            FullName: existingUser.Full_Name,
            User_Type: existingUser.User_Type
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message || "failed to login" });
    }
}
