import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { userTable , TUserInsert, TUserSelect } from "../drizzle/schema";


// Register a new user
export const createUserServices = async(user: TUserInsert):Promise<string> => {
    await db.insert(userTable).values(user).returning();
    return "User created successfully 🎉";
}

//get user by email
export const getUserByEmailService = async(email:string):Promise<TUserSelect | undefined> =>{
    return await db.query.userTable.findFirst({
        where:(eq(userTable.email,email))
    })
}