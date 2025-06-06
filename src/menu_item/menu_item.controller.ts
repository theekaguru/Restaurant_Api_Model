import { Request, Response } from "express";
import { getMenu_ItemByIdServices , getMenu_ItemServices , createMenu_ItemServices , updateMenu_ItemServices , deleteMenu_ItemServices  } from "./menu_items.service";



//create menu item
export const createMenuItem = async (req: Request, res: Response) => {
    const {Menu_Name , Restaurant_Id , Category_Id , Description  , Ingredients , Price , Active } = req.body;
    if (!Menu_Name || !Restaurant_Id || !Category_Id || !Description  || !Ingredients || !Price || Active) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newMenuItem = await createMenu_ItemServices({Menu_Name , Restaurant_Id , Category_Id , Description  , Ingredients , Price , Active });
        if (newMenuItem == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create menu item" });
        } else {
            res.status(201).json({message:newMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create menu item" });
    }
}
//get menu items
export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const allMenuItems = await getMenu_ItemServices();
        if (allMenuItems == null || allMenuItems.length == 0) {
          res.status(404).json({ message: "No menu items found 🔍" });
        }else{
            res.status(200).json(allMenuItems);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ menu items" });
    }
}

//get menu item by id
export const getMenuItemById = async (req: Request, res: Response) => {
    const Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ menu item ID 🪧" });
         return; 
    }
    try {
        const menuItem = await getMenu_ItemByIdServices(Menu_Item_Id);
        if (menuItem == null) {
            res.status(404).json({ message: "Menu item not found 🔍" });
        } else {
            res.status(200).json(menuItem);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch menu item 🪧" });
    }
}

//update menu item
export const updateMenuItem = async (req: Request, res: Response) => {
    const Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🚫 menu item ID 🪧" });
        return; 
    }
    const {Menu_Name , Restaurant_Id , Category_Id , Description  , Ingredients , Price , Active } = req.body;
    if (!Menu_Name || !Restaurant_Id || !Category_Id || !Description  || !Ingredients || !Price || !Active) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedMenuItem = await updateMenu_ItemServices(Menu_Item_Id, {Menu_Name , Restaurant_Id , Category_Id , Description  , Ingredients , Price , Active });
        if (updatedMenuItem == null) {
            res.status(404).json({ message: "Menu item not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update menu item ⤴️" });
    }
}

//delete menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
    const Menu_Item_Id = parseInt(req.params.id);
    if (isNaN(Menu_Item_Id)) {
        res.status(400).json({ error: "Invalid 🚫 menu item ID 🪧" });
        return;
    }
    try {
        const existingMenuItem = await getMenu_ItemByIdServices(Menu_Item_Id);

        if(!existingMenuItem){
            res.status(200).json({message: "Menu item 🪧 does not exit 🤷‍♂️"})
            return;
        }
        const deleteMenuItem = await deleteMenu_ItemServices(Menu_Item_Id);
        if (deleteMenuItem) {
            res.status(200).json({message:deleteMenuItem});
        } else {
            res.status(404).json({ message: "Menu item not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete menu item 🪧" });
    }
}