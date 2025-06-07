import { Request, Response } from "express";
import { createOrderStatusServices , getOrderStatusesServices, getOrderStatusByIdServices, updateOrderStatusServices, deleteOrderStatusServices } from "./order_status.service";



//createOrderStatus
export const createOrderStatus = async (req: Request, res: Response) => {
    const { Order_Id , Status_Catalog_Id } = req.body;
    if (!Order_Id || !Status_Catalog_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newOrderStatus = await createOrderStatusServices({Order_Id , Status_Catalog_Id });
        if (newOrderStatus == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Order Status ♻️" });
        } else {
            res.status(201).json({message:newOrderStatus});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Order Status ♻️" });
    }
}
//get Order Statuses
export const getOrderStatuses = async (req: Request, res: Response) => {
    try {
        const allOrderStatuses = await getOrderStatusesServices();
        if (allOrderStatuses == null || allOrderStatuses.length == 0) {
          res.status(404).json({ message: "No Order Statuses found 🔍" });
        }else{
            res.status(200).json(allOrderStatuses);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Order Statuses ♻️" });
    }
}

//getOrderStatusById
export const getOrderStatusById = async (req: Request, res: Response) => {
    const Order_Status_Id = parseInt(req.params.id);
    if (isNaN(Order_Status_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Order Status ID ♻️" });
         return; 
    }
    try {
        const orderStatus = await getOrderStatusByIdServices(Order_Status_Id);
        if (orderStatus == null) {
            res.status(404).json({ message: "Order Status not found 🔍" });
        } else {
            res.status(200).json(orderStatus);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch Order Status ♻️" });
    }
}

//update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
    const Order_Status_Id = parseInt(req.params.id);
    if (isNaN(Order_Status_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Order Status ID ♻️" });
        return; 
    }
    const {Order_Id , Status_Catalog_Id } = req.body;
    if (!Order_Id || !Status_Catalog_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedOrderStatus = await updateOrderStatusServices(Order_Status_Id, { Order_Id , Status_Catalog_Id });
        if (updatedOrderStatus == null) {
            res.status(404).json({ message: "Order Status not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedOrderStatus});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Order Status ⤴️" });
    }
}

//delete Order Status
export const deleteOrderStatus = async (req: Request, res: Response) => {
    const Order_Status_Id = parseInt(req.params.id);
    if (isNaN(Order_Status_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Order Status ID ♻️" });
        return;
    }
    try {
        const existingOrderStatus = await getOrderStatusByIdServices(Order_Status_Id);

        if(!existingOrderStatus){
            res.status(200).json({message: "Order Status ♻️ does not exist 🤷‍♂️"});
            return;
        }
        const deleteOrderStatus = await deleteOrderStatusServices(Order_Status_Id);
        if (deleteOrderStatus) {
            res.status(200).json({message:deleteOrderStatus});
        } else {
            res.status(404).json({ message: "Order Status not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete Order Status ♻️" });
    }
}