import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {User_Table , TUser_TableSelect , TUser_TableInsert } from "../drizzle/schema";


//CRUD Operations for User entity





//Get all users
export const getUsersServices = async():Promise<TUser_TableSelect[] | null> => {
    return await db.query.User_Table.findMany({
        with: {
            addresses: {
                with: {
                    city: true
                }
            },
            comments: true,
            orders: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            driver: true
        }
    });
}

//Get user by ID
export const getUserByIdServices = async(User_Id: number):Promise<TUser_TableSelect | undefined> => {
     return await db.query.User_Table.findFirst({
        where: eq(User_Table.User_Id, User_Id),
        with: {
            addresses: {
                with: {
                    city: true
                }
            },
            comments: true,
            orders: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            driver: true
        }
    })  
}

// create a new user
export const createUserServices = async(user: TUser_TableInsert):Promise<string> => {
    await db.insert(User_Table).values(user).returning();
    return "User 👤 created 👻 successfully 🥳 ";
}

// Update an existing user
export const updateUserServices = async(User_Id: number, user: Partial<TUser_TableInsert>):Promise<string> => {
    await db.update(User_Table).set(user).where(eq(User_Table.User_Id, User_Id));
    return "User 👤 updated ⤴️ successfully 🦾 ";
}


// Delete a user

export const deleteUserServices = async(User_Id: number):Promise<string> => {
  await db.delete(User_Table).where(eq(User_Table.User_Id, User_Id));
  return "User 👤 deleted 🩻 successfully 👍"
}