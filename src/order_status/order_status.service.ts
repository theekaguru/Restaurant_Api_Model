import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Order_Status_Table, TOrder_Status_TableInsert, TOrder_Status_TableSelect } from "../drizzle/schema";


//CRUD Operations for Order Status entity

//Get all Order Statuses
export const getOrderStatusesServices = async():Promise<TOrder_Status_TableSelect[] | null> => {
    return await db.query.Order_Status_Table.findMany({});
}

//Get State by ID
export const getOrderStatusByIdServices = async(Order_Status_Id: number):Promise<TOrder_Status_TableSelect | undefined> => {
     return await db.query.Order_Status_Table.findFirst({
        where: eq(Order_Status_Table.Order_Status_Id, Order_Status_Id)
    })  
}

// Create a new Order Status
export const createOrderStatusServices = async(state: TOrder_Status_TableInsert):Promise<string> => {
    await db.insert(Order_Status_Table).values(state).returning();
    return "Order Status ♻️ created successfully 🌟";
}

// Update an existing Order Status
export const updateOrderStatusServices = async(Order_Status_Id: number, state: Partial<TOrder_Status_TableInsert>):Promise<string> => {
    await db.update(Order_Status_Table).set(state).where(eq(Order_Status_Table.Order_Status_Id, Order_Status_Id));
    return "Order Status ♻️ updated successfully 🌟";
}


// Delete an existing Order Status

export const deleteOrderStatusServices = async(Order_Status_Id: number):Promise<string> => {
  await db.delete(Order_Status_Table).where(eq(Order_Status_Table.Order_Status_Id, Order_Status_Id));
  return "Order Status ♻️ deleted successfully 🫡"
}