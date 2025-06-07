import { Router } from "express";
import { createOrderMenuItem, deleteOrderMenuItem, getOrderMenuItemById, getOrderMenuItems, updateOrderMenuItem } from "./order_menu.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const orderMenuRouter = Router();

// Order Menu Item routes definition

// Get all Order Menu Items
orderMenuRouter.get('/order-menu-items', /*adminRoleAuth */  getOrderMenuItems);

// Get Order Menu Item by ID
orderMenuRouter.get('/order-menu-items/:id',/* adminRoleAuth ,*/  getOrderMenuItemById);

// Create a new Order Menu Item
orderMenuRouter.post('/order-menu-items', /*adminRoleAuth ,*/  createOrderMenuItem);

// Update an existing Order Menu Item
orderMenuRouter.put('/order-menu-items/:id',/* adminRoleAuth, */ updateOrderMenuItem);

// Delete an existing Order Menu Item
orderMenuRouter.delete('/order-menu-items/:id', /*adminRoleAuth ,*/ deleteOrderMenuItem);

// Get Order Menu Item by ID
orderMenuRouter.get('/order-menu-items/:id',/* adminRoleAuth ,*/  getOrderMenuItemById);

// Create a new Order Menu Item
orderMenuRouter.post('/order-menu-items', /*adminRoleAuth ,*/  createOrderMenuItem);

// Update an existing Order Menu Item
orderMenuRouter.put('/order-menu-items/:id',/* adminRoleAuth, */ updateOrderMenuItem);

// Delete an existing Order Menu Item
orderMenuRouter.delete('/order-menu-items/:id', /*adminRoleAuth ,*/ deleteOrderMenuItem);