import express, { Application,Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger';
import { userRouter } from './users/user.routes';
import { stateRouter } from './state/state.route';
import { cityRouter } from './city/city.route';
import { authRouter } from './auth/auth.route';
import { driverRouter } from './driver/driver.route';
import { menuItemRouter } from './menu_item/menu_item.routes';
import { addressRouter } from './address/address.route';
import { orderRouter } from './orders/orders.route';
import { orderMenuRouter } from './order_menu/order_menu.route';
import { statusCatalogRouter } from './status_catalog/status_catalog.router';
import { commentRouter } from './comment/comment.route';
import { categoryRouter } from './category/category.route';
import { orderStatusRouter } from './order_status/order_status.route';
import { restaurantownerRouter } from './restaurant_owner/restaurant_owner.route';
import { rateLimiterMiddleware } from './middleware/ratelimiter';

dotenv.config();

const app: Application = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiterMiddleware);



//default route
app.get('/', (req, res:Response) => {
  res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL");
});

// Importing user routes
app.use('/api',authRouter)

app.use('/api',addressRouter) //1
app.use('/api' ,categoryRouter) //2
app.use('/api',cityRouter) //3
app.use('/api' , commentRouter ) //4
app.use('/api', driverRouter) //5
app.use('/api',menuItemRouter)//6
app.use('/api' , orderMenuRouter) //7
app.use('/api' ,orderStatusRouter) //8
app.use('/api' ,orderRouter) //9
app.use('/api' ,restaurantownerRouter) //10
app.use('/api',stateRouter)// 11
app.use('/api' , statusCatalogRouter) //12
app.use('/api',userRouter) //13
app.use('/api' ,commentRouter) //14



const PORT = process.env.PORT || 5000;

//  then start the server

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
 });
  




