import { Router } from "express";
import {createMenuItem, deleteMenuItem, getMenuItemById, getMenuItems, updateMenuItem} from "./menu_item.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const menuItemRouter = Router();

// Menu item routes definition

// Get all menu items
menuItemRouter.get('/menu_items', /*adminRoleAuth */  getMenuItems);

// Get menu item by ID
menuItemRouter.get('/menu_items/:id',/* adminRoleAuth ,*/  getMenuItemById);

// Create a new menu item
menuItemRouter.post('/menu_items', /*adminRoleAuth ,*/  createMenuItem);

// Update an existing menu item
menuItemRouter.put('/menu_items/:id',/* adminRoleAuth, */ updateMenuItem);

// Delete an existing menu item
menuItemRouter.delete('/menu_items/:id', /*adminRoleAuth ,*/ deleteMenuItem);
