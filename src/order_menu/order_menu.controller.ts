import { Request, Response } from "express";
import { getOrderMenuItemsServices, getOrderMenuItemByIdServices, createOrderMenuItemServices, updateOrderMenuItemServices, deleteOrderMenuItemServices } from "./order_menu.service";



//createOrderMenuItem
export const createOrderMenuItem = async (req: Request, res: Response) => {
    const { menu_Order_Id , Menu_Item_Id , Quantity , Item_Price ,Price , Comment} = req.body;
    if (!menu_Order_Id || !Menu_Item_Id || !Quantity || !Item_Price || !Price || !Comment) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newOrderMenuItem = await createOrderMenuItemServices({ menu_Order_Id , Menu_Item_Id , Quantity , Item_Price ,Price , Comment});
        if (newOrderMenuItem == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Order Menu Item 📑" });
        } else {
            res.status(201).json({message:newOrderMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Order Menu Item 📑" });
    }
}
//get Order Menu Items
export const getOrderMenuItems = async (req: Request, res: Response) => {
    try {
        const allOrderMenuItems = await getOrderMenuItemsServices();
        if (allOrderMenuItems == null || allOrderMenuItems.length == 0) {
          res.status(404).json({ message: "No Order Menu Items found 🔍" });
        }else{
            res.status(200).json(allOrderMenuItems);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Order Menu Items 📑" });
    }
}

//getOrderMenuItemById
export const getOrderMenuItemById = async (req: Request, res: Response) => {
    const Order_Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Order_Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Order Menu Item ID 📑" });
         return; 
    }
    try {
        const orderMenuItem = await getOrderMenuItemByIdServices(Order_Menu_Item_Id);
        if (orderMenuItem == null) {
            res.status(404).json({ message: "Order Menu Item not found 🔍" });
        } else {
            res.status(200).json(orderMenuItem);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch Order Menu Item 📑" });
    }
}

//update Order Menu Item
export const updateOrderMenuItem = async (req: Request, res: Response) => {
    const Order_Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Order_Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Order Menu Item ID 📑" });
        return; 
    }
    const { menu_Order_Id , Menu_Item_Id , Quantity , Item_Price , Price , Comment} = req.body;
    if (!menu_Order_Id || !Menu_Item_Id || !Quantity || !Item_Price || !Price || !Comment) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedOrderMenuItem = await updateOrderMenuItemServices(Order_Menu_Item_Id, { menu_Order_Id , Menu_Item_Id , Quantity , Item_Price , Price , Comment});
        if (updatedOrderMenuItem == null) {
            res.status(404).json({ message: "Order Menu Item not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedOrderMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Order Menu Item ⤴️" });
    }
}

//delete Order Menu Item
export const deleteOrderMenuItem = async (req: Request, res: Response) => {
    const Order_Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Order_Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Order Menu Item ID 📑" });
        return;
    }
    try {
        const existingOrderMenuItem = await getOrderMenuItemByIdServices(Order_Menu_Item_Id)

        if(!existingOrderMenuItem){
            res.status(200).json({message: "Order Menu Item 📑 does not exit 🤷‍♂️"})
            return;
        }
        const deleteOrderMenuItem = await deleteOrderMenuItemServices(Order_Menu_Item_Id);
        if (deleteOrderMenuItem) {
            res.status(200).json({message:deleteOrderMenuItem});
        } else {
            res.status(404).json({ message: "Order Menu Item not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete Order Menu Item 📑" });
    }
}