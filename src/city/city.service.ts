
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { City_Table , TCity_TableInsert , TCity_TableSelect} from "../drizzle/schema";


//CRUD Operations for City entity

//Get all citys
export const getCitysServices = async():Promise<TCity_TableSelect[] | null> => {
    return await db.query.City_Table.findMany({});
}

//Get city by ID
export const getCityByIdServices = async(City_Id: number):Promise<TCity_TableSelect | undefined> => {
     return await db.query.City_Table.findFirst({
        where: eq(City_Table.City_Id, City_Id)
    })  
}

// Create a new city
export const createCityServices = async(city: TCity_TableInsert):Promise<string> => {
    await db.insert(City_Table).values(city).returning();
    return "city 🌆 created successfully ✔️";
}

// Update an existing city
export const updateCityServices = async(City_Id: number, city: Partial<TCity_TableInsert>):Promise<string> => {
    await db.update(City_Table).set(city).where(eq(City_Table.City_Id, City_Id));
    return "city updated ⤴️ successfully ✔️ ";
}


// Delete a city

export const deleteCityServices = async(City_Id: number):Promise<string> => {
  await db.delete(City_Table).where(eq(City_Table.City_Id, City_Id));
  return "City deleted 🏌️successfully ✔️"
}