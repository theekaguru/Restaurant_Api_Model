import { Router } from "express";
import { createState, deleteState, getStateById, getStates, updateState } from "./state.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const stateRouter = Router();

// State routes definition


// Get all users
stateRouter.get('/states', adminRoleAuth , getStates);

// Get user by ID
stateRouter.get('/states/:id', adminRoleAuth , getStateById);

// Create a new user
stateRouter.post('/states', adminRoleAuth , createState);

// Update an existing user
stateRouter.put('/states/:id', adminRoleAuth , updateState);


// Delete an existing user
stateRouter.delete('/states/:id', adminRoleAuth, deleteState);