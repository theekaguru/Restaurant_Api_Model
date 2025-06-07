import { Request, Response } from "express";
import { getStatusCatalogsServices , getStatusCatalogByIdServices, createStatusCatalogServices, updateStatusCatalogServices, deleteStatusCatalogServices } from "./status_catalog.service";



//createstatuscatalog
export const createStatusCatalog = async (req: Request, res: Response) => {
    const {Status_Catalog_Name  } = req.body;
    if (!Status_Catalog_Name ) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newStatusCatalog = await createStatusCatalogServices({Status_Catalog_Name });
        if (newStatusCatalog == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Status Catalog 🎯" });
        } else {
            res.status(201).json({message:newStatusCatalog});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Status Catalog 🎯" });
    }
}
//get Status Catalogs
export const getStatusCatalogs = async (req: Request, res: Response) => {
    try {
        const allStatusCatalogs = await getStatusCatalogsServices();
        if (allStatusCatalogs == null || allStatusCatalogs.length == 0) {
          res.status(404).json({ message: "No Status Catalogs found 🔍" });
        }else{
            res.status(200).json(allStatusCatalogs);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Status Catalogs 🎯" });
    }
}

//getStatusCatalogById
export const getStatusCatalogById = async (req: Request, res: Response) => {
    const Status_Catalog_Id = parseInt(req.params.id);
    if (isNaN(Status_Catalog_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Status Catalog ID 🎯" });
         return;
    }
    try {
        const statusCatalog = await getStatusCatalogByIdServices(Status_Catalog_Id);
        if (statusCatalog == null) {
            res.status(404).json({ message: "Status Catalog not found 🔍" });
        } else {
            res.status(200).json(statusCatalog);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch Status Catalog 🎯" });
    }
}

//update Status Catalog
export const updateStatusCatalog = async (req: Request, res: Response) => {
    const Status_Catalog_Id = parseInt(req.params.id);
    if (isNaN(Status_Catalog_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Status Catalog ID 🎯" });
        return;
    }
    const {Status_Catalog_Name  } = req.body;
    if (!Status_Catalog_Name ) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedStatusCatalog = await updateStatusCatalogServices(Status_Catalog_Id, { Status_Catalog_Name });
        if (updatedStatusCatalog == null) {
            res.status(404).json({ message: "Status Catalog not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedStatusCatalog});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Status Catalog ⤴️" });
    }
}

//delete Status Catalog
export const deleteStatusCatalog = async (req: Request, res: Response) => {
    const Status_Catalog_Id = parseInt(req.params.id);
    if (isNaN(Status_Catalog_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Status Catalog ID 🎯" });
        return;
    }
    try {
        const existingStatusCatalog = await getStatusCatalogByIdServices(Status_Catalog_Id);

        if(!existingStatusCatalog){
            res.status(200).json({message: "Status Catalog 🎯 does not exist 🤷‍♂️"});
            return;
        }
        const deleteStatusCatalog = await deleteStatusCatalogServices(Status_Catalog_Id);
        if (deleteStatusCatalog) {
            res.status(200).json({message:deleteStatusCatalog});
        } else {
            res.status(404).json({ message: "Status Catalog not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete Status Catalog 🎯" });
    }
}