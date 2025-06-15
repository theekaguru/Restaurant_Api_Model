import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {Driver_Table , TDriver_TableInsert , TDriver_TableSelect} from "../drizzle/schema";


//CRUD Operations for Driver entity

//Get all Drivers
export const getDriversServices = async():Promise<TDriver_TableSelect[] | null> => {
    return await db.query.Driver_Table.findMany({
        with: {
            user: true,
            orders: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            }
        }
    });
}

//Get Driver by ID
export const getDriverByIdServices = async(Driver_Id: number):Promise<TDriver_TableSelect | undefined> => {
     return await db.query.Driver_Table.findFirst({
        where: eq(Driver_Table.Driver_Id, Driver_Id),
        with: {
            user: true,
            orders: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            }
        }
    })  
}

// Create a new Driver
export const createDriverServices = async(driver: TDriver_TableInsert):Promise<string> => {
    await db.insert(Driver_Table).values(driver).returning();
    return "Driver 🤖 created successfully 🌟";
}

// Update an existing Driver
export const updateDriverServices = async(Driver_Id: number, driver: Partial<TDriver_TableInsert>):Promise<string> => {
    await db.update(Driver_Table).set(driver).where(eq(Driver_Table.Driver_Id, Driver_Id));
    return "Driver 🤖 updated successfully 🌟";
}


// Delete a Driver

export const deleteDriverServices = async(Driver_Id: number):Promise<string> => {
  await db.delete(Driver_Table).where(eq(Driver_Table.Driver_Id, Driver_Id));
  return "Driver 🤖 deleted successfully 🫡"
}