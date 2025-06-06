
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Address_Table , TAddress_TableInsert , TAddress_TableSelect } from "../drizzle/schema";


//CRUD Operations for Address entity

//Get all Addresses
export const getAddressesServices = async():Promise<TAddress_TableSelect[] | null> => {
    return await db.query.Address_Table.findMany({});
}

//Get Address by ID
export const getAddressByIdServices = async(Address_Id: number):Promise<TAddress_TableSelect | undefined> => {
     return await db.query.Address_Table.findFirst({
        where: eq(Address_Table.Address_Id, Address_Id)
    })  
}

// Create a new Address
export const createAddressServices = async(address: TAddress_TableInsert):Promise<string> => {
    await db.insert(Address_Table).values(address).returning();
    return "Address 🏠 created successfully 🌟";
}

// Update an existing Address
export const updateAddressServices = async(Address_Id: number, address: Partial<TAddress_TableInsert>):Promise<string> => {
    await db.update(Address_Table).set(address).where(eq(Address_Table.Address_Id, Address_Id));
    return "Address 🏠 updated successfully 🌟";
}


// Delete an Address

export const deleteAddressServices = async(Address_Id: number):Promise<string> => {
  await db.delete(Address_Table).where(eq(Address_Table.Address_Id, Address_Id));
  return "Address 🏠 deleted successfully 🫡"
}