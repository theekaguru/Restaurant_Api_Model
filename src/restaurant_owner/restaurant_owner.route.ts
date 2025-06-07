import { Router } from "express";
import{getRestaurantOwner , createRestaurantOwner , getRestaurantOwnerById , updateRestaurantOwner , deleteRestaurantOwner } from "./restaurant_owner.controller"
 
export const restaurantownerRouter = Router();


//get all Restaurant owners
restaurantownerRouter.get('/RestaurantOwner' ,getRestaurantOwner)

//get reastaurant  owner by id
restaurantownerRouter.get('/restaurantowner/:id' , getRestaurantOwnerById)

//create Restaurant Owner
restaurantownerRouter.post('/RestaurantOwner' , createRestaurantOwner)

//updating Restaurant owner 
restaurantownerRouter.put('/restaurantowner' , updateRestaurantOwner)

//delete Restaurant Owner

restaurantownerRouter.delete('/RestaurantOwner' , deleteRestaurantOwner)
