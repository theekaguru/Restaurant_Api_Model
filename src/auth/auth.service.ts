import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUser_TableInsert , TUser_TableSelect, User_Table } from "../drizzle/schema";




// Register A New User
export const createUserServices = async(user: TUser_TableInsert):Promise<string> => {
    // Check if user with email already exists
    const existingUser = await getUserByEmailServices(user.Email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    
    await db.insert(User_Table).values(user).returning();
    return "User 👤 created 👻 successfully 🥳 ";
}

    //get user by email
export const getUserByEmailServices =async(email:string):Promise<TUser_TableSelect | undefined> =>{
   return await db.query.User_Table.findFirst({
    where:(eq(User_Table.Email , email))
   })
}