
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, userTable } from "../drizzle/schema";


//CRUD Operations for User entity





//Get all users
export const getUsersServices = async():Promise<TUserSelect[] | null> => {
    return await db.query.userTable.findMany({});
}

//Get user by ID
export const getUserByIdServices = async(userId: number):Promise<TUserSelect | undefined> => {
     return await db.query.userTable.findFirst({
        where: eq(userTable.userId, userId)
    })  
}

// create a new user
export const createUserServices = async(user: TUserInsert):Promise<string> => {
    await db.insert(userTable).values(user).returning();
    return "User created successfully 🎉";
}

// Update an existing user
export const updateUserServices = async(userId: number, user: Partial<TUserInsert>):Promise<string> => {
    await db.update(userTable).set(user).where(eq(userTable.userId, userId));
    return "User updated successfully 😎";
}


// Delete a user

export const deleteUserServices = async(userId: number):Promise<string> => {
  await db.delete(userTable).where(eq(userTable.userId, userId));
  return "Blog deleted successfully 🎉"
}