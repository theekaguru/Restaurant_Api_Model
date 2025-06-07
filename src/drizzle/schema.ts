import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, varchar, integer, boolean,timestamp,text, decimal } from "drizzle-orm/pg-core";

// ENUMS
export const roleEnum = pgEnum("role", ["admin", "driver", "owner", "member"]);



function withTimestamps() {
  return {
    Created_At: timestamp("Created_At").defaultNow(),
    Updated_At: timestamp("Updated_At").defaultNow(),
  };
}

// USER_TABLE 1
export const User_Table = pgTable("User_Table", {
  User_Id: serial("User_Id").primaryKey(),
  Full_Name: varchar("Full_Name", { length: 255 }),
  Contact_Phone: integer("Contact_Phone"),
  Phone_Verified: boolean("Phone_Verified").default(false), 
  Email: varchar("Email", { length: 255 }).notNull(),
  Email_verified: boolean("Email_Verified").default(false),
  Confirmation_Code: text("Confirmation_Code"),
  Password: text("Password").notNull(),
  User_Type: roleEnum("User_Type").default("member"),
  ...withTimestamps(),
});


// STATE_TABLE 2
export const State_Table = pgTable("State_Table", {
  State_Id: serial("State_Id").primaryKey(),
  State_Name: text("State_Name"),
  Code: text("Code"),
  ...withTimestamps(),
});

// CITY_TABLE 3
export const City_Table = pgTable("City_Table", {
  City_Id: serial("City_Id").primaryKey(),
  City_Name: text("City_Name"),
  State_Id: integer("State_Id").references(() => State_Table.State_Id),
  ...withTimestamps(),
});

// RESTAURANT_TABLE 4
export const Restaurant_Table = pgTable("Restaurant_Table", {
  Restaurant_Id: serial("Restaurant_Id").primaryKey(),
  Restaurant_Name: text("Restaurant_Name"),
  Street_Address: text("Street_Address"),
  Zip_Code: text("Zip_Code"),
  City_Id: integer("City_Id").references(() => City_Table.City_Id),
  ...withTimestamps(),
});

// RESTAURANT_OWNER_TABLE 5
export const Restaurant_Owner_Table = pgTable("Restaurant_Owner_Table", {
  Restaurant_Owner_Id: serial("Restaurant_Owner_Id").primaryKey(),
  Restaurant_Id: integer("Restaurant_Id").references(() => Restaurant_Table.Restaurant_Id),
  Owner_Id: integer("Owner_Id").references(() => User_Table.User_Id),
  ...withTimestamps(),
});

// CATEGORY_TABLE 6
export const Category_Table = pgTable("Category_Table", {
  Category_Id: serial("Category_Id").primaryKey(),
  Category_Name: text("Category_Name"),
  ...withTimestamps(),
});

// MENU_ITEM_TABLE 7
export const Menu_Item_Table = pgTable("Menu_Item_Table", {
  Menu_Item_Id: serial("Menu_Item_Id").primaryKey(),
  Menu_Name: text("Menu_Name").notNull(),
  Restaurant_Id: integer("Restaurant_Id").references(() => Restaurant_Table.Restaurant_Id),
  Category_Id: integer("Category_Id").references(() => Category_Table.Category_Id),
  Description: text("Description"),
  Ingredients: text("Ingredients"),
  Price: decimal("Price").notNull(),
  Active: boolean("Active").default(true),
  ...withTimestamps(),
});

// DRIVER_TABLE 8
export const Driver_Table = pgTable("Driver_Table", {
  Driver_Id: serial("Driver_Id").primaryKey(),
  Car_Make: text("Car_Make"),
  Car_Model: text("Car_Model"),
  Car_Year: integer("Car_Year"),
  User_Id: integer("User_Id").references(() => User_Table.User_Id),
  Online: boolean("Online").default(false),
  Delivering: boolean("Delivering").default(false),
  ...withTimestamps(),
});

// ADDRESS_TABLE 9
export const Address_Table = pgTable("Address_Table", {
  Address_Id: serial("Address_Id").primaryKey(),
  Street_Address_1: text("Street_Address_1"),
  Street_Address_2: text("Street_Address_2"),
  Zip_Code: text("Zip_Code"),
  Delivery_Instructions: text("Delivery_Instructions"),
  User_Id: integer("User_Id").references(() => User_Table.User_Id),
  City_Id: integer("City_Id").references(() => City_Table.City_Id),
  ...withTimestamps(),
});

// ORDERS_TABLE 10
export const Orders_Table = pgTable("Orders_Table", {
  Orders_Id: serial("Orders_Id").primaryKey(),
  Restaurant_Id: integer("Restaurant_Id").references(() => Restaurant_Table.Restaurant_Id),
  Estimated_Delivery_Time: timestamp("Estimated_Delivery_Time"),
  Actual_Delivery_Time: timestamp("Actual_Delivery_Time"),
  Delivery_Address_Id: integer("Delivery_Address_Id").references(() => Address_Table.Address_Id),
  User_Id: integer("User_Id").references(() => User_Table.User_Id),
  Driver_Id: integer("Driver_Id").references(() => Driver_Table.Driver_Id),
  Price: decimal("Price"),
  Discount: decimal("Discount"),
  Final_Price: decimal("Final_Price"),
  Comment: text("Comment"),
  ...withTimestamps(),
});

// ORDER_MENU_ITEM_TABLE 11
export const Order_Menu_Item_Table = pgTable("Order_Menu_Item_Table", {
  Order_Menu_Item_Id: serial("Order_Menu_Item_Id").primaryKey(),
  menu_Order_Id: integer("Order_Id").references(() => Orders_Table.Orders_Id),
  Menu_Item_Id: integer("Menu_Item_Id").references(() => Menu_Item_Table.Menu_Item_Id),
  Quantity: integer("Quantity"),
  Item_Price: decimal("Item_Price"),
  Price: decimal("Price"),
  Comment: text("Comment"),
  ...withTimestamps(),
});

// COMMENT_TABLE 12
export const Comment_Table = pgTable("Comment_Table", {
  Comment_Id: serial("Comment_Id").primaryKey(),
  Order_Id: integer("Order_Id").references(() => Orders_Table.Orders_Id),
  User_Id: integer("User_Id").references(() => User_Table.User_Id),
  Comment_Text: text("Comment_Text"),
  Is_Complaint: boolean("Is_Complaint"),
  Is_Praise: boolean("Is_Praise"),
  ...withTimestamps(),
});

// STATUS_CATALOG_TABLE 13
export const Status_Catalog_Table = pgTable("Status_Catalog_Table", {
  Status_Catalog_Id: serial("Status_Catalog_Id").primaryKey(),
  Status_Catalog_Name: text("Status_Catalog_Name"),
  ...withTimestamps(),
});

// ORDER_STATUS_TABLE 14
export const Order_Status_Table = pgTable("Order_Status_Table", {
  Order_Status_Id: serial("Order_Status_Id").primaryKey(),
  Order_Id: integer("Order_Id").references(() => Orders_Table.Orders_Id),
  Status_Catalog_Id: integer("Status_Catalog_Id").references(() => Status_Catalog_Table.Status_Catalog_Id),
  ...withTimestamps(),
});

//                      ========== RELATIONSHIPS ==========


export const User_Relations = relations(User_Table, ({ many, one }) => ({
  addresses: many(Address_Table),
  comments: many(Comment_Table),
  orders: many(Orders_Table),
  driver: one(Driver_Table, {
    fields: [User_Table.User_Id],
    references: [Driver_Table.User_Id],
  }),
}));

export const Restaurant_Relations = relations(Restaurant_Table, ({ many, one }) => ({
  menuItems: many(Menu_Item_Table),
  owners: many(Restaurant_Owner_Table),
  orders: many(Orders_Table),
  city: one(City_Table, {
    fields: [Restaurant_Table.City_Id],
    references: [City_Table.City_Id],
  }),
}));

export const Restaurant_Owner_Relations = relations(Restaurant_Owner_Table, ({ one }) => ({
  restaurant: one(Restaurant_Table, {
    fields: [Restaurant_Owner_Table.Restaurant_Id],
    references: [Restaurant_Table.Restaurant_Id],
  }),
  owner: one(User_Table, {
    fields: [Restaurant_Owner_Table.Owner_Id],
    references: [User_Table.User_Id],
  }),
}));

export const Menu_Item_Relations = relations(Menu_Item_Table, ({ one, many }) => ({
  restaurant: one(Restaurant_Table, {
    fields: [Menu_Item_Table.Restaurant_Id],
    references: [Restaurant_Table.Restaurant_Id],
  }),
  category: one(Category_Table, {
    fields: [Menu_Item_Table.Category_Id],
    references: [Category_Table.Category_Id],
  }),
  orderItems: many(Order_Menu_Item_Table),
}));

export const Orders_Relations = relations(Orders_Table, ({ one, many }) => ({
  restaurant: one(Restaurant_Table, {
    fields: [Orders_Table.Restaurant_Id],
    references: [Restaurant_Table.Restaurant_Id],
  }),
  address: one(Address_Table, {
    fields: [Orders_Table.Delivery_Address_Id],
    references: [Address_Table.Address_Id],
  }),
  user: one(User_Table, {
    fields: [Orders_Table.User_Id],
    references: [User_Table.User_Id],
  }),
  driver: one(Driver_Table, {
    fields: [Orders_Table.Driver_Id],
    references: [Driver_Table.Driver_Id],
  }),
  items: many(Order_Menu_Item_Table),
  comments: many(Comment_Table),
  statuses: many(Order_Status_Table),
}));

export const Order_Menu_Item_Relations = relations(Order_Menu_Item_Table, ({ one }) => ({
  order: one(Orders_Table, {
    fields: [Order_Menu_Item_Table. menu_Order_Id],
    references: [Orders_Table.Orders_Id],
  }),
  menuItem: one(Menu_Item_Table, {
    fields: [Order_Menu_Item_Table.Menu_Item_Id],
    references: [Menu_Item_Table.Menu_Item_Id],
  }),
}));

export const Comment_Relations = relations(Comment_Table, ({ one }) => ({
  order: one(Orders_Table, {
    fields: [Comment_Table.Order_Id],
    references: [Orders_Table.Orders_Id],
  }),
  user: one(User_Table, {
    fields: [Comment_Table.User_Id],
    references: [User_Table.User_Id],
  }),
}));

export const Driver_Relations = relations(Driver_Table, ({ one, many }) => ({
  user: one(User_Table, {
    fields: [Driver_Table.User_Id],
    references: [User_Table.User_Id],
  }),
  orders: many(Orders_Table),
}));

export const Address_Relations = relations(Address_Table, ({ one, many }) => ({
  user: one(User_Table, {
    fields: [Address_Table.User_Id],
    references: [User_Table.User_Id],
  }),
  city: one(City_Table, {
    fields: [Address_Table.City_Id],
    references: [City_Table.City_Id],
  }),
  orders: many(Orders_Table),
}));

export const City_Relations = relations(City_Table, ({ one, many }) => ({
  state: one(State_Table, {
    fields: [City_Table.State_Id],
    references: [State_Table.State_Id],
  }),
  addresses: many(Address_Table),
  restaurants: many(Restaurant_Table),
}));

export const State_Relations = relations(State_Table, ({ many }) => ({
  cities: many(City_Table),
}));

export const Order_Status_Relations = relations(Order_Status_Table, ({ one }) => ({
  order: one(Orders_Table, {
    fields: [Order_Status_Table.Order_Id],
    references: [Orders_Table.Orders_Id],
  }),
  statusCatalog: one(Status_Catalog_Table, {
    fields: [Order_Status_Table.Status_Catalog_Id],
    references: [Status_Catalog_Table.Status_Catalog_Id],
  }),
}));

export const Status_Catalog_Relations = relations(Status_Catalog_Table, ({ many }) => ({
  orderStatuses: many(Order_Status_Table),
}));

//                   ==================Inferences===========================

// USERSTABLE 1
export type TUser_TableInsert = typeof User_Table.$inferInsert;
export type TUser_TableSelect = typeof User_Table.$inferSelect;

// STATE_TABLE 2
export type TState_TableInsert = typeof State_Table.$inferInsert;
export type TState_TableSelect = typeof State_Table.$inferSelect;

// CITY_TABLE 3
export type TCity_TableInsert = typeof City_Table.$inferInsert;
export type TCity_TableSelect = typeof City_Table.$inferSelect;

// RESTAURANT_TABLE 4
export type TRestaurant_TableInsert = typeof Restaurant_Table.$inferInsert;
export type TRestaurant_TableSelect = typeof Restaurant_Table.$inferSelect;

// RESTAURANT_OWNER_TABLE 5
export type TRestaurant_Owner_TableInsert = typeof Restaurant_Owner_Table.$inferInsert;
export type TRestaurant_Owner_TableSelect = typeof Restaurant_Owner_Table.$inferSelect;

// CATEGORY_TABLE 6
export type TCategory_TableInsert = typeof Category_Table.$inferInsert;
export type TCategory_TableSelect = typeof Category_Table.$inferSelect;

// MENU_ITEM_TABLE 7
export type TMenu_Item_TableInsert = typeof Menu_Item_Table.$inferInsert;
export type TMenu_Item_TableSelect = typeof Menu_Item_Table.$inferSelect;

// ORDERS_TABLE 8
export type TOrders_TableInsert = typeof Orders_Table.$inferInsert;
export type TOrders_TableSelect = typeof Orders_Table.$inferSelect;

// ORDER_MENU_ITEM_TABLE 9
export type TOrder_Menu_Item_TableInsert = typeof Order_Menu_Item_Table.$inferInsert;
export type TOrder_Menu_Item_TableSelect = typeof Order_Menu_Item_Table.$inferSelect;

// COMMENT_TABLE 10
export type TComment_TableInsert = typeof Comment_Table.$inferInsert;
export type TComment_TableSelect = typeof Comment_Table.$inferSelect;

// DRIVER_TABLE 11
export type TDriver_TableInsert = typeof Driver_Table.$inferInsert;
export type TDriver_TableSelect = typeof Driver_Table.$inferSelect;

// ADDRESS_TABLE 10
export type TAddress_TableInsert = typeof Address_Table.$inferInsert;
export type TAddress_TableSelect = typeof Address_Table.$inferSelect;

// STATUS_CATALOG_TABLE 13
export type TStatus_Catalog_TableInsert = typeof Status_Catalog_Table.$inferInsert;
export type TStatus_Catalog_TableSelect = typeof Status_Catalog_Table.$inferSelect;

// ORDER_STATUS_TABLE 14
export type TOrder_Status_TableInsert = typeof Order_Status_Table.$inferInsert;
export type TOrder_Status_TableSelect = typeof Order_Status_Table.$inferSelect;
