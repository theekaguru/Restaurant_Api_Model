import { Request, Response } from "express";
import { createCityServices, deleteCityServices, getCityByIdServices, getCitysServices, updateCityServices } from "./city.service";

//Business logic for cities-related operations

// create City
export const createCity = async (req: Request, res: Response) => {
    const { City_Name, State_Id } = req.body;
    if (!City_Name || !State_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newCity = await createCityServices({ City_Name, State_Id  });
        if (newCity == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create city 🌆" });
        } else {
            res.status(201).json({ message: newCity });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed 🙆‍♂️ to create city 🌆" });
    }
}


//get city 
export const getCities = async (req: Request, res: Response) => {
    try {
        const allCities = await getCitysServices();
        if (allCities == null || allCities.length == 0) {
            res.status(404).json({ message: "No cities found 🔍" });
        } else {
            res.status(200).json(allCities);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch ⤴️ City 🌆" });
    }
}

//get city by Id
export const getCityById = async (req: Request, res: Response) => {
    const City_Id = parseInt(req.params.id);
    if (isNaN(City_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ City ID 🌆" });
        return; 
    }
    try {
        const city = await getCityByIdServices(City_Id);
        if (city == null) {
            res.status(404).json({ message: "city not found 🔍" });
        } else {
            res.status(200).json(city);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed 🙆‍♂️ to fetch City 🌆" });
    }
}

//update city
export const updateCity = async (req: Request, res: Response) => {
    const City_Id = parseInt(req.params.id);
    if (isNaN(City_Id)) {
        res.status(400).json({ error: "Invalid 🚫 city ID 🌆" });
        return; 
    }
    const { City_Name, State_Id } = req.body;
    if (!City_Name || !State_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedCity = await updateCityServices(City_Id, { City_Name, State_Id });
        if (updatedCity == null) {
            res.status(404).json({ message: "City not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({ message: updatedCity });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to update City ⤴️" });
    }
}

//delete city
export const deleteCity = async (req: Request, res: Response) => {
    const City_Id = parseInt(req.params.id);
    if (isNaN(City_Id)) {
        res.status(400).json({ error: "Invalid 🚫 City ID 🪧" });
        return; 
    }
    const existingCity = await getCityByIdServices(City_Id)
    if (!existingCity) {
        res.status(200).json({ message: "City 🌆 does not exit 🤷‍♂️" });
        return;
    }
    try {
        const existingCity = await getCityByIdServices(City_Id)

        if(!existingCity){
            res.status(200).json({message: "City🪧 does not exit 🤷‍♂️"})
            return;
        }
        const deleteCity = await deleteCityServices(City_Id);
        if (deleteCity) {
            res.status(200).json({message:deleteCity});
        } else {
            res.status(404).json({ message: "City not found 🔍" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed 🚫 to delete City 🌆" });
    }    
}