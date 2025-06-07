import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Orders_Table , TOrders_TableInsert, TOrders_TableSelect } from "../drizzle/schema";


//CRUD Operations for Orders entity

//Get all Orders
export const getOrdersServices = async():Promise<TOrders_TableSelect[] | null> => {
    return await db.query.Orders_Table.findMany({});
}

//Get Order by ID
export const getOrderByIdServices = async(Orders_Id: number):Promise<TOrders_TableSelect | undefined> => {
     return await db.query.Orders_Table.findFirst({
        where: eq(Orders_Table.Orders_Id, Orders_Id)
    })  
}

// Create a new Order
export const createOrderServices = async(order: TOrders_TableInsert):Promise<string> => {
    await db.insert(Orders_Table).values(order).returning();
    return "Order 📑 created successfully 🌟";
}

// Update an existing Order
export const updateOrderServices = async(Orders_Id: number, order: Partial<TOrders_TableInsert>):Promise<string> => {
    await db.update(Orders_Table).set(order).where(eq(Orders_Table.Orders_Id, Orders_Id));
    return "Order 📑 updated successfully 🌟";
}


// Delete an Order

export const deleteOrderServices = async(Orders_Id: number):Promise<string> => {
  await db.delete(Orders_Table).where(eq(Orders_Table.Orders_Id, Orders_Id));
  return "Order 📑 deleted successfully 🫡"
}