import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Restaurant_Table, TRestaurant_TableInsert, TRestaurant_TableSelect } from "../drizzle/schema";

//Get all Restaurants
export const getRestaurantsServices = async():Promise<TRestaurant_TableSelect[] | null> => {
    return await db.query.Restaurant_Table.findMany({
        with: {
            menuItems: {
                with: {
                    category: true
                }
            },
            owners: {
                with: {
                    owner: true
                }
            },
            orders: {
                with: {
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            city: {
                with: {
                    state: true
                }
            }
        }
    });
}

//Get Restaurant by ID
export const getRestaurantByIdServices = async(Restaurant_Id: number):Promise<TRestaurant_TableSelect | undefined> => {
     return await db.query.Restaurant_Table.findFirst({
        where: eq(Restaurant_Table.Restaurant_Id, Restaurant_Id),
        with: {
            menuItems: {
                with: {
                    category: true
                }
            },
            owners: {
                with: {
                    owner: true
                }
            },
            orders: {
                with: {
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            city: {
                with: {
                    state: true
                }
            }
        }
    })  
} 