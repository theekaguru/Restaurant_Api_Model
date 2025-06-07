import { Router } from "express";
import { createStatusCatalog, deleteStatusCatalog, getStatusCatalogById, getStatusCatalogs, updateStatusCatalog } from "./status_catalog.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const statusCatalogRouter = Router();

// Status Catalog routes definition

// Get all Status Catalogs
statusCatalogRouter.get('/status-catalogs', /*adminRoleAuth */  getStatusCatalogs);

// Get Status Catalog by ID
statusCatalogRouter.get('/status-catalogs/:id',/* adminRoleAuth ,*/  getStatusCatalogById);

// Create a new Status Catalog
statusCatalogRouter.post('/status-catalogs', /*adminRoleAuth ,*/  createStatusCatalog);

// Update an existing Status Catalog
statusCatalogRouter.put('/status-catalogs/:id',/* adminRoleAuth, */ updateStatusCatalog);

// Delete an existing Status Catalog
statusCatalogRouter.delete('/status-catalogs/:id', /*adminRoleAuth ,*/ deleteStatusCatalog);

// Get Status Catalog by ID
statusCatalogRouter.get('/status-catalogs/:id',/* adminRoleAuth ,*/  getStatusCatalogById);

// Create a new Status Catalog
statusCatalogRouter.post('/status-catalogs', /*adminRoleAuth ,*/  createStatusCatalog);

// Update an existing Status Catalog
statusCatalogRouter.put('/status-catalogs/:id',/* adminRoleAuth, */ updateStatusCatalog);

// Delete an existing Status Catalog
statusCatalogRouter.delete('/status-catalogs/:id', /*adminRoleAuth ,*/ deleteStatusCatalog);