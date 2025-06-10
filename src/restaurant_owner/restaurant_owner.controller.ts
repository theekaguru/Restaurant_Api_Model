import { Request, Response } from "express";
import { createRestaurantOwnerServices , getRestaurantOwnersServices , getRestaurantOwnerByIdServices , updateRestaurantOwnerServices, deleteRestaurantOwnerServices } from "./restaurant_owner.service";


//get restaurant owner 
export const getRestaurantOwner = async (req: Request, res: Response) => {
    try {
        const allRestaurantOwners = await getRestaurantOwnersServices();
        if (allRestaurantOwners == null || allRestaurantOwners.length == 0) {
          res.status(404).json({ message: "No Restaurant Owner found 🔍" });
          return;
        }else{
            res.status(200).json(allRestaurantOwners);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Restaurant Owner 👨‍💼" });
    }
}


//create restaurant owner
export const createRestaurantOwner= async (req: Request, res: Response) => {
    const { Restaurant_Id , Owner_Id} = req.body;
    if (!Restaurant_Id || !Owner_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newrestaurantowners = await createRestaurantOwnerServices({ Restaurant_Id , Owner_Id });
        if (newrestaurantowners == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create restaurant owner 👨‍💼" });
        } else {
            res.status(201).json({message:newrestaurantowners});
            return;
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create restaurant owner 👨‍💼" });
    }
}

//get restaurant owner by id
export const getRestaurantOwnerById = async (req: Request, res: Response) => {
    const Restaurant_Owner_Id = parseInt(req.params.id);
    if (isNaN(Restaurant_Owner_Id)) {
        res.status(400).json({ error: "Invalid Restaurant owner 👨‍💼 Id " });
         return; 
    }
    try {
        const RestaurantOwner = await getRestaurantOwnerByIdServices(Restaurant_Owner_Id);
        if (RestaurantOwner == null) {
            res.status(404).json({ message: "RestaurantOwner 👨‍💼 not found 🔍" });
        } else {
            res.status(200).json(RestaurantOwner);
            return;
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch RestaurantOwner 👨‍💼" });
    }
}

//update RestaurantOwner
export const updateRestaurantOwner = async (req: Request, res: Response) => {
    const Restaurant_Owner_Id = parseInt(req.params.id);
    if (isNaN(Restaurant_Owner_Id)) {
        res.status(400).json({ error: "Invalid 🚫 RestaurantOwner ID  👨‍💼" });
        return; 
    }
    const { Restaurant_Id , Owner_Id} = req.body;
    if (!Restaurant_Id || !Owner_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedRestaurantOwner = await updateRestaurantOwnerServices(Restaurant_Owner_Id, { Restaurant_Id , Owner_Id});
        if (updatedRestaurantOwner == null) {
            res.status(404).json({ message: "Restaurant Owner  not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedRestaurantOwner});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Restaurant Owner⤴️" });
    }
}

//delete RestaurantOwner
export const deleteRestaurantOwner = async (req: Request, res: Response) => {
    const Restaurant_Owner_Id = parseInt(req.params.id);  
    if (isNaN(Restaurant_Owner_Id)) {
        res.status(400).json({ error: "Invalid 🚫 RestaurantOwner ID 🪧" });
        return;
    }
    try {
        // Check if the restaurant owner exists
        const existingRestaurantOwner = await getRestaurantOwnerByIdServices(Restaurant_Owner_Id);
        if (!existingRestaurantOwner) {
            res.status(404).json({ message: "Restaurant Owner 👨‍💼 does not exist 🤷‍♂️" });
            return;
        }
        // Delete the restaurant owner
        const deletedRestaurantOwner = await deleteRestaurantOwnerServices(Restaurant_Owner_Id);
        res.status(200).json({ message: deletedRestaurantOwner });
    } catch (error: any) {    
        res.status(500).json({ error: error.message || "Failed 🚫 to delete RestaurantOwner 🪧" });
    }    
}