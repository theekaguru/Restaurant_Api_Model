import { Request, Response } from "express";
import { createUserServices, deleteUserServices, getUserByIdServices, getUsersServices, updateUserServices } from "./user.service";




//create user
export const createUser = async (req: Request, res: Response) => {
    const { Full_Name , Contact_Phone , Phone_Verified , Email ,Email_verified , Confirmation_Code , Password} = req.body;
    if (!Full_Name || !Contact_Phone  || !Email  || !Confirmation_Code || !Password ) {
        res.status(400).json({ error: "All fields 🖇️ are required" });
        return;
    }
    try {
        const newUser = await createUserServices({ Full_Name , Contact_Phone , Phone_Verified , Email ,Email_verified , Confirmation_Code , Password});
        if (newUser == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create user" });
            return;
        } else {
            res.status(201).json(newUser);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create user" });
    }
}

//get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getUsersServices();
        if (allUsers == null || allUsers.length == 0) {
          res.status(404).json({ message: "No users found 🔍" });
        }else{
            res.status(200).json(allUsers);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙅‍♂️ to fetch users" });
    }
}

//get user by Id
export const getUserById = async (req: Request, res: Response) => {
    const User_Id = parseInt(req.params.id);
    if (isNaN(User_Id)) {
        res.status(400).json({ error: "Invalid 💀 user ID" });
         return; // Prevent further execution
    }
    try {
        const user = await getUserByIdServices(User_Id);
        if (user == null) {
            res.status(404).json({ message: "User not found 🔍" });
        } else {
            res.status(200).json(user);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⛓️‍💥 user" });
    }
}

//update user
export const updateUser = async (req: Request, res: Response) => {
    const User_Id = parseInt(req.params.id);
    if (isNaN(User_Id)) {
        res.status(400).json({ error: "Invalid 💀 user ID" });
        return; 
    }
    const { Full_Name , Contact_Phone , Phone_Verified , Email ,Email_verified , Confirmation_Code , Password} = req.body;
    if (!Full_Name || !Contact_Phone  || !Email || !Confirmation_Code || !Password ) {
        res.status(400).json({ error: "All fields are required" });
        return; 
    }
    try {
        const updatedUser = await updateUserServices(User_Id, { Full_Name , Contact_Phone , Phone_Verified , Email ,Email_verified , Confirmation_Code , Password });
        if (updatedUser == null) {
            res.status(404).json({ message: "User not found 🔍 or failed to update 🙆‍♂️" });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update ⤴️ user" });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const User_Id = parseInt(req.params.id);  
    if (isNaN(User_Id)) {
        res.status(400).json({ error: "Invalid 💀 user ID" });
        return; 
    }
    try {
        const deletedUser = await deleteUserServices(User_Id);
        if (deletedUser) {
            res.status(200).json({ message: "User deleted 🩻 successfully" });
            return;
        } else {
            res.status(404).json({ message: "User not found 🙅‍♂️" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed ✕⁛ to delete 🩻 user" });
    }    
}