import { Request, Response } from "express";
import { getOrdersServices, getOrderByIdServices, createOrderServices, updateOrderServices, deleteOrderServices } from "./orders.service";



//createOrder
export const createOrder = async (req: Request, res: Response) => {
    const { Restaurant_Id , Estimated_Delivery_Time , Actual_Delivery_Time , Delivery_Address_Id , User_Id , Driver_Id , Price , Discount , Final_Price , Comment  } = req.body;
    if (!Restaurant_Id || !Estimated_Delivery_Time || !Actual_Delivery_Time || !Delivery_Address_Id || !User_Id || !Driver_Id || !Price || !Discount || !Final_Price || !Comment) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newOrder = await createOrderServices({ Restaurant_Id , Estimated_Delivery_Time , Actual_Delivery_Time , Delivery_Address_Id , User_Id , Driver_Id , Price , Discount , Final_Price , Comment });
        if (newOrder == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Order 📑 " });
        } else {
            res.status(201).json({message:newOrder});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Order 📑 " });
    }
}
//get Orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const allOrders = await getOrdersServices();
        if (allOrders == null || allOrders.length == 0) {
          res.status(404).json({ message: "No Orders found 🔍" });
        }else{
            res.status(200).json(allOrders);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Orders 📑" });
    }
}

//getOrderById
export const getOrderById = async (req: Request, res: Response) => {
    const Order_Id = parseInt(req.params.id);
    if (isNaN(Order_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Order ID 📑" });
         return; 
    }
    try {
        const order = await getOrderByIdServices(Order_Id);
        if (order == null) {
            res.status(404).json({ message: "Order not found 🔍" });
        } else {
            res.status(200).json(order);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch order 📑" });
    }
}

//update order
export const updateOrder = async (req: Request, res: Response) => {
    const Order_Id = parseInt(req.params.id);
    if (isNaN(Order_Id)) {
        res.status(400).json({ error: "Invalid 🚫 order ID 📑" });
        return; 
    }
    const {Restaurant_Id , Estimated_Delivery_Time , Actual_Delivery_Time , Delivery_Address_Id , User_Id , Driver_Id , Price , Discount , Final_Price , Comment  } = req.body;
    if (!Restaurant_Id || !Estimated_Delivery_Time || !Actual_Delivery_Time || !Delivery_Address_Id || !User_Id || !Driver_Id || !Price || !Discount || !Final_Price || !Comment) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedOrder = await updateOrderServices(Order_Id, { Restaurant_Id , Estimated_Delivery_Time , Actual_Delivery_Time , Delivery_Address_Id , User_Id , Driver_Id , Price , Discount , Final_Price , Comment });
        if (updatedOrder == null) {
            res.status(404).json({ message: "Order not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedOrder});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Order ⤴️" });
    }
}

//delete order
export const deleteOrder = async (req: Request, res: Response) => {
    const Order_Id = parseInt(req.params.id);
    if (isNaN(Order_Id)) {
        res.status(400).json({ error: "Invalid 🚫 order ID 📑" });
        return;
    }
    try {
        const existingOrder = await getOrderByIdServices(Order_Id)

        if(!existingOrder){
            res.status(200).json({message: "Order 📑 does not exit 🤷‍♂️"})
            return;
        }
        const deleteOrder = await deleteOrderServices(Order_Id);
        if (deleteOrder) {
            res.status(200).json({message:deleteOrder});
        } else {
            res.status(404).json({ message: "Order not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete order 📑" });
    }
}