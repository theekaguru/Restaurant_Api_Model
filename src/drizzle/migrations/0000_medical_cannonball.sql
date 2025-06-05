CREATE TYPE "public"."role" AS ENUM('admin', 'driver', 'owner', 'member');--> statement-breakpoint
CREATE TABLE "Address_Table" (
	"Address_Id" serial PRIMARY KEY NOT NULL,
	"Street_Address_1" text,
	"Street_Address_2" text,
	"Zip_Code" text,
	"Delivery_Instructions" text,
	"User_Id" integer,
	"City_Id" integer,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Category_Table" (
	"Category_Id" serial PRIMARY KEY NOT NULL,
	"Category_Name" text,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "City_Table" (
	"City_Id" serial PRIMARY KEY NOT NULL,
	"City_Name" text,
	"State_Id" integer,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Comment_Table" (
	"Comment_Id" serial PRIMARY KEY NOT NULL,
	"Order_Id" integer,
	"User_Id" integer,
	"Comment_Text" text,
	"Is_Complaint" boolean,
	"Is_Praise" boolean,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Driver_Table" (
	"Driver_Id" serial PRIMARY KEY NOT NULL,
	"Car_Make" text,
	"Car_Model" text,
	"Car_Year" integer,
	"User_Id" integer,
	"Online" boolean DEFAULT false,
	"Delivering" boolean DEFAULT false,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Menu_Item_Table" (
	"Menu_Item_Id" serial PRIMARY KEY NOT NULL,
	"Menu_Name" text NOT NULL,
	"Restaurant_Id" integer,
	"Category_Id" integer,
	"Description" text,
	"Ingredients" text,
	"Price" numeric NOT NULL,
	"Active" boolean DEFAULT true,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Order_Menu_Item_Table" (
	"Order_Menu_Item_Id" serial PRIMARY KEY NOT NULL,
	"Order_Id" integer,
	"Menu_Item_Id" integer,
	"Quantity" integer,
	"Item_Price" numeric,
	"Price" numeric,
	"Comment" text,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Order_Status_Table" (
	"Order_Status_Id" serial PRIMARY KEY NOT NULL,
	"Order_Id" integer,
	"Status_Catalog_Id" integer,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Orders_Table" (
	"Orders_Id" serial PRIMARY KEY NOT NULL,
	"Restaurant_Id" integer,
	"Estimated_Delivery_Time" timestamp,
	"Actual_Delivery_Time" timestamp,
	"Delivery_Address_Id" integer,
	"User_Id" integer,
	"Driver_Id" integer,
	"Price" numeric,
	"Discount" numeric,
	"Final_Price" numeric,
	"Comment" text,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Restaurant_Owner_Table" (
	"Restaurant_Owner_Id" serial PRIMARY KEY NOT NULL,
	"Restaurant_Id" integer,
	"Owner_Id" integer,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Restaurant_Table" (
	"Restaurant_Id" serial PRIMARY KEY NOT NULL,
	"Restaurant_Name" text,
	"Street_Address" text,
	"Zip_Code" text,
	"City_Id" integer,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "State_Table" (
	"State_Id" serial PRIMARY KEY NOT NULL,
	"State_Name" text,
	"Code" text,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Status_Catalog_Table" (
	"Status_Catalog_Id" serial PRIMARY KEY NOT NULL,
	"Status_Catalog_Name" text,
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "User_Table" (
	"User_Id" serial PRIMARY KEY NOT NULL,
	"Full_Name" varchar(255),
	"Contact_Phone" integer,
	"Phone_Verified" boolean DEFAULT false,
	"Email" varchar(255) NOT NULL,
	"Email_Verified" boolean DEFAULT false,
	"Confirmation_Code" text,
	"Password" text NOT NULL,
	"User_Type" "role" DEFAULT 'member',
	"Created_At" timestamp DEFAULT now(),
	"Updated_At" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "Address_Table" ADD CONSTRAINT "Address_Table_User_Id_User_Table_User_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "public"."User_Table"("User_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Address_Table" ADD CONSTRAINT "Address_Table_City_Id_City_Table_City_Id_fk" FOREIGN KEY ("City_Id") REFERENCES "public"."City_Table"("City_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "City_Table" ADD CONSTRAINT "City_Table_State_Id_State_Table_State_Id_fk" FOREIGN KEY ("State_Id") REFERENCES "public"."State_Table"("State_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Comment_Table" ADD CONSTRAINT "Comment_Table_Order_Id_Orders_Table_Orders_Id_fk" FOREIGN KEY ("Order_Id") REFERENCES "public"."Orders_Table"("Orders_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Comment_Table" ADD CONSTRAINT "Comment_Table_User_Id_User_Table_User_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "public"."User_Table"("User_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Driver_Table" ADD CONSTRAINT "Driver_Table_User_Id_User_Table_User_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "public"."User_Table"("User_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Menu_Item_Table" ADD CONSTRAINT "Menu_Item_Table_Restaurant_Id_Restaurant_Table_Restaurant_Id_fk" FOREIGN KEY ("Restaurant_Id") REFERENCES "public"."Restaurant_Table"("Restaurant_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Menu_Item_Table" ADD CONSTRAINT "Menu_Item_Table_Category_Id_Category_Table_Category_Id_fk" FOREIGN KEY ("Category_Id") REFERENCES "public"."Category_Table"("Category_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order_Menu_Item_Table" ADD CONSTRAINT "Order_Menu_Item_Table_Order_Id_Orders_Table_Orders_Id_fk" FOREIGN KEY ("Order_Id") REFERENCES "public"."Orders_Table"("Orders_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order_Menu_Item_Table" ADD CONSTRAINT "Order_Menu_Item_Table_Menu_Item_Id_Menu_Item_Table_Menu_Item_Id_fk" FOREIGN KEY ("Menu_Item_Id") REFERENCES "public"."Menu_Item_Table"("Menu_Item_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order_Status_Table" ADD CONSTRAINT "Order_Status_Table_Order_Id_Orders_Table_Orders_Id_fk" FOREIGN KEY ("Order_Id") REFERENCES "public"."Orders_Table"("Orders_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order_Status_Table" ADD CONSTRAINT "Order_Status_Table_Status_Catalog_Id_Status_Catalog_Table_Status_Catalog_Id_fk" FOREIGN KEY ("Status_Catalog_Id") REFERENCES "public"."Status_Catalog_Table"("Status_Catalog_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Orders_Table" ADD CONSTRAINT "Orders_Table_Restaurant_Id_Restaurant_Table_Restaurant_Id_fk" FOREIGN KEY ("Restaurant_Id") REFERENCES "public"."Restaurant_Table"("Restaurant_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Orders_Table" ADD CONSTRAINT "Orders_Table_Delivery_Address_Id_Address_Table_Address_Id_fk" FOREIGN KEY ("Delivery_Address_Id") REFERENCES "public"."Address_Table"("Address_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Orders_Table" ADD CONSTRAINT "Orders_Table_User_Id_User_Table_User_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "public"."User_Table"("User_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Orders_Table" ADD CONSTRAINT "Orders_Table_Driver_Id_Driver_Table_Driver_Id_fk" FOREIGN KEY ("Driver_Id") REFERENCES "public"."Driver_Table"("Driver_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Restaurant_Owner_Table" ADD CONSTRAINT "Restaurant_Owner_Table_Restaurant_Id_Restaurant_Table_Restaurant_Id_fk" FOREIGN KEY ("Restaurant_Id") REFERENCES "public"."Restaurant_Table"("Restaurant_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Restaurant_Owner_Table" ADD CONSTRAINT "Restaurant_Owner_Table_Owner_Id_User_Table_User_Id_fk" FOREIGN KEY ("Owner_Id") REFERENCES "public"."User_Table"("User_Id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Restaurant_Table" ADD CONSTRAINT "Restaurant_Table_City_Id_City_Table_City_Id_fk" FOREIGN KEY ("City_Id") REFERENCES "public"."City_Table"("City_Id") ON DELETE no action ON UPDATE no action;