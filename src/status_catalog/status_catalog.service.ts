import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Status_Catalog_Table, TStatus_Catalog_TableInsert, TStatus_Catalog_TableSelect } from "../drizzle/schema";


//CRUD Operations for Status Catalog entity

//Get all Status Catalogs
export const getStatusCatalogsServices = async():Promise<TStatus_Catalog_TableSelect[] | null> => {
    return await db.query.Status_Catalog_Table.findMany({});
}

//Get State by ID
export const getStatusCatalogByIdServices = async(Status_Catalog_Id: number):Promise<TStatus_Catalog_TableSelect | undefined> => {
     return await db.query.Status_Catalog_Table.findFirst({
        where: eq(Status_Catalog_Table.Status_Catalog_Id, Status_Catalog_Id)
    })  
}

// Create a new Status Catalog
export const createStatusCatalogServices = async(state: TStatus_Catalog_TableInsert):Promise<string> => {
    await db.insert(Status_Catalog_Table).values(state).returning();
    return "Status Catalog 🪧 created successfully 🌟";
}

// Update an existing Status Catalog
export const updateStatusCatalogServices = async(Status_Catalog_Id: number, state: Partial<TStatus_Catalog_TableInsert>):Promise<string> => {
    await db.update(Status_Catalog_Table).set(state).where(eq(Status_Catalog_Table.Status_Catalog_Id, Status_Catalog_Id));
    return "Status Catalog 🪧 updated successfully 🌟";
}


// Delete a Status Catalog

export const deleteStatusCatalogServices = async(Status_Catalog_Id: number):Promise<string> => {
  await db.delete(Status_Catalog_Table).where(eq(Status_Catalog_Table.Status_Catalog_Id, Status_Catalog_Id));
  return "Status Catalog 🪧 deleted successfully 🫡"
}