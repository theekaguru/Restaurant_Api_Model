import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Menu_Item_Table, TMenu_Item_TableInsert, TMenu_Item_TableSelect } from "../drizzle/schema"; // <-- use Menu_Item types

// Get all menu items
export const getMenu_ItemServices = async (): Promise<TMenu_Item_TableSelect[] | null> => {
    return await db.query.Menu_Item_Table.findMany({});
}

// Get menu item by ID
export const getMenu_ItemByIdServices = async (Menu_Item_Id: number): Promise<TMenu_Item_TableSelect | undefined> => {
    return await db.query.Menu_Item_Table.findFirst({
        where: eq(Menu_Item_Table.Menu_Item_Id, Menu_Item_Id)
    });
}

// Create a new menu item
export const createMenu_ItemServices = async (menu_item: TMenu_Item_TableInsert): Promise<string> => {
    await db.insert(Menu_Item_Table).values(menu_item).returning();
    return "menu_item 🛍️ created successfully 🌟";
}

// Update an existing menu item
export const updateMenu_ItemServices = async (Menu_Item_Id: number, menu_item: Partial<TMenu_Item_TableInsert>): Promise<string> => {
    await db.update(Menu_Item_Table).set(menu_item).where(eq(Menu_Item_Table.Menu_Item_Id, Menu_Item_Id));
    return "menu_item 🛍️ updated successfully 🌟";
}

// Delete a menu item
export const deleteMenu_ItemServices = async (Menu_Item_Id: number): Promise<string> => {
    await db.delete(Menu_Item_Table).where(eq(Menu_Item_Table.Menu_Item_Id, Menu_Item_Id));
    return "menu_item 🛍️ deleted successfully 🫡";
}