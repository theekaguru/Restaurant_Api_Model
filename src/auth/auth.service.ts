import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {User_Table , TUser_TableSelect , TUser_TableInsert } from "../drizzle/schema";


// Register a new user
export const createUserServices = async(user: TUser_TableInsert):Promise<string> => {
    await db.insert(User_Table).values(user).returning();
    return "User 👤 created 👻 successfully 🥳 ";
}

