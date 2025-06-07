import { Router } from "express";
import { createCategory, deleteCategory, getCategoryById, getCategories, updateCategory } from "./category.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const categoryRouter = Router();

// Category routes definition

// Get all categories
categoryRouter.get('/categories', /*adminRoleAuth */  getCategories);

// Get category by ID
categoryRouter.get('/categories/:id',/* adminRoleAuth ,*/  getCategoryById);

// Create a new category
categoryRouter.post('/categories', /*adminRoleAuth ,*/  createCategory);

// Get category by ID
categoryRouter.get('/categories/:id',/* adminRoleAuth ,*/  getCategoryById);

// Create a new category
categoryRouter.post('/categories', /*adminRoleAuth ,*/  createCategory);

// Update an existing category
categoryRouter.put('/categories/:id',/* adminRoleAuth, */ updateCategory);

// Delete an existing category
categoryRouter.delete('/categories/:id', /*adminRoleAuth ,*/ deleteCategory);