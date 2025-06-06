import { Request, Response } from "express";
import { getDriversServices, getDriverByIdServices, createDriverServices, updateDriverServices, deleteDriverServices } from "./driver.service";



//createstate
export const createDriver = async (req: Request, res: Response) => {
    const { Car_Make , Car_Model , Car_Year ,User_Id ,Online ,Delivering} = req.body;
    if (!Car_Make || !Car_Model || !Car_Year || !User_Id || Online === undefined || Delivering === undefined) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newDriver = await createDriverServices({ Car_Make , Car_Model , Car_Year ,User_Id ,Online ,Delivering });
        if (newDriver == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Driver 🤖" });
        } else {
            res.status(201).json({message:newDriver});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Driver 🤖" });
    }
}
//get Drivers
export const getDrivers = async (req: Request, res: Response) => {
    try {
        const allDrivers = await getDriversServices();
        if (allDrivers == null || allDrivers.length == 0) {
          res.status(404).json({ message: "No Drivers found 🔍" });
        }else{
            res.status(200).json(allDrivers);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Drivers 🤖" });
    }
}

//getDriverById
export const getDriverById = async (req: Request, res: Response) => {
    const Driver_Id = parseInt(req.params.id);
    if (isNaN(Driver_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Driver ID �" });
         return; 
    }
    try {
        const driver = await getDriverByIdServices(Driver_Id);
        if (driver == null) {
            res.status(404).json({ message: "Driver not found 🔍" });
        } else {
            res.status(200).json(driver);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch driver 🤖" });
    }
}

//update driver
export const updateDriver = async (req: Request, res: Response) => {
    const Driver_Id = parseInt(req.params.id);
    if (isNaN(Driver_Id)) {
        res.status(400).json({ error: "Invalid 🚫 driver ID �" });
        return; 
    }
    const { Car_Make , Car_Model , Car_Year ,User_Id ,Online ,Delivering} = req.body;
    if (!Car_Make || !Car_Model || !Car_Year || !User_Id || Online === undefined || Delivering === undefined) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedDriver = await updateDriverServices(Driver_Id, { Car_Make , Car_Model , Car_Year ,User_Id ,Online ,Delivering });
        if (updatedDriver == null) {
            res.status(404).json({ message: "Driver not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedDriver});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Driver ⤴️" });
    }
}

//delete driver
export const deleteDriver = async (req: Request, res: Response) => {
    const Driver_Id = parseInt(req.params.id);  
    if (isNaN(Driver_Id)) {
        res.status(400).json({ error: "Invalid 🚫 driver ID �" });
        return;
    }
    try {
        const existingDriver = await getDriverByIdServices(Driver_Id)

        if(!existingDriver){
            res.status(200).json({message: "Driver 🤖 does not exist 🤷‍♂️"})
            return;
        }
        const deleteDriver = await deleteDriverServices(Driver_Id);
        if (deleteDriver) {
            res.status(200).json({message:deleteDriver});
        } else {
            res.status(404).json({ message: "Driver not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete driver 🤖" });
    }
}