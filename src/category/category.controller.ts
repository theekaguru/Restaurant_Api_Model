import { Request, Response } from "express";
import { getCategoriesServices, getCategoryByIdServices, createCategoryServices, updateCategoryServices, deleteCategoryServices } from "./category.service";



//createCategory
export const createCategory = async (req: Request, res: Response) => {
    const { Category_Name } = req.body;
    if (!Category_Name) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newCategory = await createCategoryServices({ Category_Name });
        if (newCategory == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Category 🔠" });
        } else {
            res.status(201).json({message:newCategory});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Category 🔠" });
    }
}
//get Categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await getCategoriesServices();
        if (allCategories == null || allCategories.length == 0) {
          res.status(404).json({ message: "No Categories found 🔍" });
        }else{
            res.status(200).json(allCategories);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Categories 🔠" });
    }
}

//getCategoryById
export const getCategoryById = async (req: Request, res: Response) => {
    const Category_Id = parseInt(req.params.id);
    if (isNaN(Category_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Category ID 🔠" });
         return; 
    }
    try {
        const category = await getCategoryByIdServices(Category_Id);
        if (category == null) {
            res.status(404).json({ message: "Category not found 🔍" });
        } else {
            res.status(200).json(category);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch category 🔠" });
    }
}

//update category
export const updateCategory = async (req: Request, res: Response) => {
    const Category_Id = parseInt(req.params.id);
    if (isNaN(Category_Id)) {
        res.status(400).json({ error: "Invalid 🚫 category ID 🔠" });
        return; 
    }
    const {Category_Name } = req.body;
    if (!Category_Name) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedCategory = await updateCategoryServices(Category_Id, { Category_Name });
        if (updatedCategory == null) {
            res.status(404).json({ message: "Category not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedCategory});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Category ⤴️" });
    }
}

//delete category
export const deleteCategory = async (req: Request, res: Response) => {
    const Category_Id = parseInt(req.params.id);
    if (isNaN(Category_Id)) {
        res.status(400).json({ error: "Invalid 🚫 category ID 🔠" });
        return;
    }
    try {
        const existingCategory = await getCategoryByIdServices(Category_Id)

        if(!existingCategory){
            res.status(200).json({message: "Category 🔠 does not exit 🤷‍♂️"})
            return;
        }
        const deleteCategory = await deleteCategoryServices(Category_Id);
        if (deleteCategory) {
            res.status(200).json({message:deleteCategory});
        } else {
            res.status(404).json({ message: "Category not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete category 🔠" });
    }
}