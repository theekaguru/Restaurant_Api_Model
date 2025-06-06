import { Router } from "express";
import { createAddress, deleteAddress, getAddressById, getAddresses, updateAddress } from "./address.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const addressRouter = Router();

// Address routes definition


// Get all addresses
addressRouter.get('/addresses', /*adminRoleAuth */  getAddresses);

// Get address by ID
addressRouter.get('/addresses/:id',/* adminRoleAuth ,*/  getAddressById);

// Create a new address
addressRouter.post('/addresses', /*adminRoleAuth ,*/  createAddress);

// Update an existing address
addressRouter.put('/addresses/:id',/* adminRoleAuth, */ updateAddress);

// Delete an existing address
addressRouter.delete('/addresses/:id', /*adminRoleAuth ,*/ deleteAddress);