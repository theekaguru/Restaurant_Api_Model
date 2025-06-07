import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Category_Table , TCategory_TableInsert, TCategory_TableSelect } from "../drizzle/schema";


//CRUD Operations for Category entity

//Get all Categories
export const getCategoriesServices = async():Promise<TCategory_TableSelect[] | null> => {
    return await db.query.Category_Table.findMany({});
}

//Get Category by ID
export const getCategoryByIdServices = async(Category_Id: number):Promise<TCategory_TableSelect | undefined> => {
     return await db.query.Category_Table.findFirst({
        where: eq(Category_Table.Category_Id, Category_Id)
    })  
}

// Create a new Category
export const createCategoryServices = async(category: TCategory_TableInsert):Promise<string> => {
    await db.insert(Category_Table).values(category).returning();
    return "Category 🔠 created successfully 🌟";
}

// Update an existing Category
export const updateCategoryServices = async(Category_Id: number, category: Partial<TCategory_TableInsert>):Promise<string> => {
    await db.update(Category_Table).set(category).where(eq(Category_Table.Category_Id, Category_Id));
    return "Category 🔠 updated successfully 🌟";
}


// Delete a Category

export const deleteCategoryServices = async(Category_Id: number):Promise<string> => {
  await db.delete(Category_Table).where(eq(Category_Table.Category_Id, Category_Id));
  return "Category 🔠 deleted successfully 🫡"
}