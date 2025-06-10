import {
  User_Table , State_Table , City_Table , Address_Table , Restaurant_Table , Restaurant_Owner_Table , Category_Table, Menu_Item_Table , Driver_Table , Orders_Table , Comment_Table , Status_Catalog_Table , Order_Status_Table , Order_Menu_Item_Table,
} from "./schema";
import db from "./db";

async function seed() {
  // USERS
  const [Ascar] = await db.insert(User_Table).values({
    Full_Name: "Ascar",
    Contact_Phone: 123456789,
    Email: "Ascar@gmail.com",
    Email_verified: false,
    Confirmation_Code: "A254",
    Password: "Ascar123",
    User_Type: "member",
  }).returning();

  const [Admin] = await db.insert(User_Table).values({
    Full_Name: "Admin",
    Contact_Phone: 987654321,
    Email: "Admin@gmail.com",
    Email_verified: false,
    Confirmation_Code: "A123",
    Password: "Admin123",
    User_Type: "admin",
  }).returning();

  // STATE
  const [Pumwani] = await db.insert(State_Table).values({
    State_Name: "Pumwani",
    Code: "Nairobi 254",
  }).returning();

  // CITY
  const [Vasha] = await db.insert(City_Table).values({
    City_Name: "Vasha",
    State_Id: Pumwani.State_Id,
  }).returning();

  // ADDRESS
  const [LA_Lakers] = await db.insert(Address_Table).values({
    Street_Address_1: "LA Lakers",
    Street_Address_2: "DON HOME",
    Zip_Code: "Pipeline254",
    Delivery_Instructions: "Deliver On Time",
    User_Id: Ascar.User_Id,
    City_Id: Vasha.City_Id,
  }).returning();

  // RESTAURANT
  const [LC_MARIOT] = await db.insert(Restaurant_Table).values({
    Restaurant_Name: "LC_MARIOT",
    Street_Address: "NAIROBI_254",
    Zip_Code: "WESTLANDS",
    City_Id: Vasha.City_Id,
  }).returning();

  // RESTAURANT OWNER
  const [The_Don] = await db.insert(Restaurant_Owner_Table).values({
    Restaurant_Id: LC_MARIOT.Restaurant_Id,
    Owner_Id: Ascar.User_Id,
  }).returning();

  // CATEGORY
  const [Dessert] = await db.insert(Category_Table).values({
    Category_Name: "Dessert",
  }).returning();

  // MENU ITEM
  const [SPICY] = await db.insert(Menu_Item_Table).values({
    Menu_Name: "SPICY",
    Restaurant_Id: LC_MARIOT.Restaurant_Id,
    Category_Id: Dessert.Category_Id,
    Description: "Yummy",
    Ingredients: "Garlic",
    Price: "500.0",
    Active: true,
  }).returning();

  // DRIVER
  const [Kyla] = await db.insert(Driver_Table).values({
    Car_Make: "Volvo",
    Car_Model: "V40",
    Car_Year: 2019,
    User_Id: Admin.User_Id,
    Online: false,
    Delivering: false,
  }).returning();

  // ORDER_TABLE
 const [Burger] = await db.insert(Orders_Table).values({
  Restaurant_Id: LC_MARIOT.Restaurant_Id,
  Estimated_Delivery_Time: "today 11:30am",
  Actual_Delivery_Time: "2025-06-09T11:30:00Z",  
  Delivery_Address_Id: LA_Lakers.Address_Id,
  User_Id: Ascar.User_Id,
  Driver_Id: Kyla.Driver_Id,
  Price: "500.0",      // <-- string
  Discount: "20.5",    // <-- string
  Final_Price: "485",  // <-- string
  Comment: "Thank You",
}).returning();

  // ORDER MENU ITEM
  const [Drinks] = await db.insert(Order_Menu_Item_Table).values({
  menu_Order_Id: Burger.Orders_Id,      
  Menu_Item_Id: SPICY.Menu_Item_Id,
  Quantity: 2,
  Item_Price: "100.0",                 
  Price: "150.0",                      
  Comment: "Yummy",
}).returning();

  // COMMENT
  const [Great] = await db.insert(Comment_Table).values({
    Order_Id: Burger.Orders_Id,
    User_Id: Ascar.User_Id,
    Comment_Text: "Top Restaurants",
    Is_Complaint: false,
  }).returning();

  // STATUS CATALOG
  const [Appearance] = await db.insert(Status_Catalog_Table).values({
    Status_Catalog_Name: "Appearance",
  }).returning();

  // ORDER STATUS
  const [Status] = await db.insert(Order_Status_Table).values({
    Order_Id: Burger.Orders_Id,
    Status_Catalog_Id: Appearance.Status_Catalog_Id,
  }).returning();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
console.log("Seeding completed successfully.🚀🚀🚀");