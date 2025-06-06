import { Router } from "express";
import { createCity, deleteCity, getCities, getCityById, updateCity } from "./city.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const cityRouter = Router();

// User routes definition


// Get all users
cityRouter.get('/city', /*adminRoleAuth ,*/   getCities);

// Get user by ID
cityRouter.get('/city/:id', /*adminRoleAuth ,*/ getCityById);

// Create a new user
cityRouter.post('/city',/*adminRoleAuth ,*/  createCity);

// Update an existing user
cityRouter.put('/city/:id', /*adminRoleAuth ,*/  updateCity);


// Delete an existing user
cityRouter.delete('/city/:id',/*adminRoleAuth ,*/  deleteCity);