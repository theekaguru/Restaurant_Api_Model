import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Order_Menu_Item_Table, TOrder_Menu_Item_TableInsert, TOrder_Menu_Item_TableSelect } from "../drizzle/schema";


//CRUD Operations for State entity

//Get all Order Menu Items
export const getOrderMenuItemsServices = async():Promise<TOrder_Menu_Item_TableSelect[] | null> => {
    return await db.query.Order_Menu_Item_Table.findMany({
        with: {
            order: {
                with: {
                    restaurant: true,
                    user: true,
                    driver: {
                        with: {
                            user: true
                        }
                    }
                }
            },
            menuItem: {
                with: {
                    category: true,
                    restaurant: true
                }
            }
        }
    });
}

//Get Order Menu Item by ID
export const getOrderMenuItemByIdServices = async(Order_Menu_Item_Id: number):Promise<TOrder_Menu_Item_TableSelect | undefined> => {
     return await db.query.Order_Menu_Item_Table.findFirst({
        where: eq(Order_Menu_Item_Table.Order_Menu_Item_Id, Order_Menu_Item_Id),
        with: {
            order: {
                with: {
                    restaurant: true,
                    user: true,
                    driver: {
                        with: {
                            user: true
                        }
                    }
                }
            },
            menuItem: {
                with: {
                    category: true,
                    restaurant: true
                }
            }
        }
    })  
}

// Create a new Order Menu Item
export const createOrderMenuItemServices = async(item: TOrder_Menu_Item_TableInsert):Promise<string> => {
    await db.insert(Order_Menu_Item_Table).values(item).returning();
    return "Order Menu Item 📑 created successfully 🌟";
}

// Update an existing Order Menu Item
export const updateOrderMenuItemServices = async(Order_Menu_Item_Id: number, item: Partial<TOrder_Menu_Item_TableInsert>):Promise<string> => {
    await db.update(Order_Menu_Item_Table).set(item).where(eq(Order_Menu_Item_Table.Order_Menu_Item_Id, Order_Menu_Item_Id));
    return "Order Menu Item 📑 updated successfully 🌟";
}


// Delete a Order Menu Item

export const deleteOrderMenuItemServices = async(Order_Menu_Item_Id: number):Promise<string> => {
  await db.delete(Order_Menu_Item_Table).where(eq(Order_Menu_Item_Table.Order_Menu_Item_Id, Order_Menu_Item_Id));
  return "Order Menu Item 📑 deleted successfully 🫡"
}