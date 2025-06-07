import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./user.controller";
import { adminRoleAuth ,bothRoleAuth } from "../middleware/bearAuth";

export const userRouter = Router();

// User routes definition



// Create a new user
userRouter.post('/users', createUser);

// Get all users
userRouter.get('/users',/*adminRoleAuth ,*/ getUsers);

// Get user by ID
userRouter.get('/users/:id', getUserById);

// Update an existing user
userRouter.put('/users/:id' ,/* bothRoleAuth ,*/updateUser);

// Delete an existing user
userRouter.delete('/users/:id',/* adminRoleAuth ,*/ deleteUser);