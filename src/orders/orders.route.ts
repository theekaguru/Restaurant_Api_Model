import { Router } from "express";
import { createOrder , deleteOrder, getOrderById, getOrders, updateOrder } from "./order.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const orderRouter = Router();

// Order routes definition

// Get all orders
orderRouter.get('/orders', /*adminRoleAuth */  getOrders);

// Get order by ID
orderRouter.get('/orders/:id',/* adminRoleAuth ,*/  getOrderById);

// Create a new order
orderRouter.post('/orders', /*adminRoleAuth ,*/  createOrder);

// Update an existing order
orderRouter.put('/orders/:id',/* adminRoleAuth, */ updateOrder);

// Delete an existing order
orderRouter.delete('/orders/:id', /*adminRoleAuth ,*/ deleteOrder);

