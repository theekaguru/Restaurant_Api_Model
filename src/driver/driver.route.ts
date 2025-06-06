import { Router } from "express";
import { createDriver, deleteDriver, getDriverById, getDrivers, updateDriver } from "./driver.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const driverRouter = Router();

// Driver routes definition

// Get all drivers
driverRouter.get('/drivers', /*adminRoleAuth */  getDrivers);

// Get driver by ID
driverRouter.get('/drivers/:id',/* adminRoleAuth ,*/  getDriverById);

// Create a new driver
driverRouter.post('/drivers', /*adminRoleAuth ,*/  createDriver);

// Update an existing driver
driverRouter.put('/drivers/:id',/* adminRoleAuth, */ updateDriver);

// Delete an existing driver
driverRouter.delete('/drivers/:id', /*adminRoleAuth ,*/ deleteDriver);

// Get driver by ID
driverRouter.get('/drivers/:id',/* adminRoleAuth ,*/  getDriverById);

// Create a new driver
driverRouter.post('/drivers', /*adminRoleAuth ,*/  createDriver);

// Update an existing driver
driverRouter.put('/drivers/:id',/* adminRoleAuth, */ updateDriver);

// Delete an existing driver
driverRouter.delete('/drivers/:id', /*adminRoleAuth ,*/ deleteDriver);