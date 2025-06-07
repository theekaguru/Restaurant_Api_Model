import { Router } from "express";
import { createOrderStatus , deleteOrderStatus, getOrderStatusById, getOrderStatuses, updateOrderStatus } from "./order_status.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const orderStatusRouter = Router();

// Order Status routes definition

// Get all Order Statuses
orderStatusRouter.get('/order-statuses', /*adminRoleAuth */  getOrderStatuses);

// Get Order Status by ID
orderStatusRouter.get('/order-statuses/:id',/* adminRoleAuth ,*/  getOrderStatusById);

// Create a new Order Status
orderStatusRouter.post('/order-statuses', /*adminRoleAuth ,*/  createOrderStatus);

// Update an existing Order Status
orderStatusRouter.put('/order-statuses/:id',/* adminRoleAuth, */ updateOrderStatus);

// Delete an existing Order Status
orderStatusRouter.delete('/order-statuses/:id', /*adminRoleAuth ,*/ deleteOrderStatus);

// Get Order Status by ID
orderStatusRouter.get('/order-statuses/:id',/* adminRoleAuth ,*/  getOrderStatusById);

// Create a new Order Status
orderStatusRouter.post('/order-statuses', /*adminRoleAuth ,*/  createOrderStatus);

// Update an existing Order Status
orderStatusRouter.put('/order-statuses/:id',/* adminRoleAuth, */ updateOrderStatus);

// Delete an existing Order Status
orderStatusRouter.delete('/order-statuses/:id', /*adminRoleAuth ,*/ deleteOrderStatus);