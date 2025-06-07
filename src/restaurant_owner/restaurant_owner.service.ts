import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Restaurant_Owner_Table, TRestaurant_Owner_TableInsert, TRestaurant_Owner_TableSelect } from "../drizzle/schema";


//CRUD Operations for Restaurant Owner entity

// Create a new Restaurant Owner
export const createRestaurantOwnerServices = async(restaurantOwner: TRestaurant_Owner_TableInsert):Promise<string> => {
    await db.insert(Restaurant_Owner_Table).values(restaurantOwner).returning();
    return "Restaurant Owner 👨‍💼 created successfully 🌟";
}

//Get all Restaurant Owners
export const getRestaurantOwnersServices = async():Promise<TRestaurant_Owner_TableSelect[] | null> => {
    return await db.query.Restaurant_Owner_Table.findMany({});
}

//Get Restaurant Owner by ID
export const getRestaurantOwnerByIdServices = async(Restaurant_Owner_Id: number):Promise<TRestaurant_Owner_TableSelect | undefined> => {
     return await db.query.Restaurant_Owner_Table.findFirst({
        where: eq(Restaurant_Owner_Table.Restaurant_Owner_Id, Restaurant_Owner_Id)
    })  
}


// Update an existing Restaurant Owner
export const updateRestaurantOwnerServices = async(Restaurant_Owner_Id: number, restaurantOwner: Partial<TRestaurant_Owner_TableInsert>):Promise<string> => {
    await db.update(Restaurant_Owner_Table).set(restaurantOwner).where(eq(Restaurant_Owner_Table.Restaurant_Owner_Id, Restaurant_Owner_Id));
    return "Restaurant Owner 👨‍💼 updated successfully 🌟";
}


// Delete a Restaurant Owner

export const deleteRestaurantOwnerServices = async(Restaurant_Owner_Id: number):Promise<string> => {
  await db.delete(Restaurant_Owner_Table).where(eq(Restaurant_Owner_Table.Restaurant_Owner_Id, Restaurant_Owner_Id));
  return "Restaurant Owner 👨‍💼 deleted successfully 🫡"
}