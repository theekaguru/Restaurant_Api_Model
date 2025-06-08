import { Request, Response } from "express";
import { getAddressesServices, getAddressByIdServices, createAddressServices, updateAddressServices, deleteAddressServices } from "./address.service";



//create address
export const createAddress = async (req: Request, res: Response) => {
    const { Street_Address_1 , Street_Address_2 , Zip_Code , Delivery_Instructions , User_Id ,City_Id } = req.body;
    if (!Street_Address_1  ||!Street_Address_2 || !Zip_Code || !Delivery_Instructions ||!User_Id || !City_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newAddress = await createAddressServices({ Street_Address_1 , Street_Address_2 , Zip_Code , Delivery_Instructions , User_Id ,City_Id });
        if (newAddress == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Address 🏠" });
        } else {
            res.status(201).json({message:newAddress});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Address 🏠" });
    }
}
//get Addresses
export const getAddresses = async (req: Request, res: Response) => {
    try {
        const allAddresses = await getAddressesServices();
        if (allAddresses == null || allAddresses.length == 0) {
          res.status(404).json({ message: "No Addresses found 🔍" });
        }else{
            res.status(200).json(allAddresses);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Addresses 🏠" });
    }
}

//getaddressbyid
export const getAddressById = async (req: Request, res: Response) => {
    const Address_Id = parseInt(req.params.id);
    if (isNaN(Address_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Address ID 🏠" });
         return; 
    }
    try {
        const address = await getAddressByIdServices(Address_Id);
        if (address == null) {
            res.status(404).json({ message: "Address not found 🔍" });
        } else {
            res.status(200).json(address);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch address 🏠" });
    }
}

//update address
export const updateAddress = async (req: Request, res: Response) => {
    const Address_Id = parseInt(req.params.id);
    if (isNaN(Address_Id)) {
        res.status(400).json({ error: "Invalid 🚫 address ID 🏠" });
        return; 
    }
    const { Street_Address_1 , Street_Address_2 , Zip_Code , Delivery_Instructions , User_Id ,City_Id} = req.body;
    if (!Street_Address_1 || !Zip_Code || !User_Id || !City_Id) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedAddress = await updateAddressServices(Address_Id, { Street_Address_1 , Street_Address_2 , Zip_Code , Delivery_Instructions , User_Id ,City_Id });
        if (updatedAddress == null) {
            res.status(404).json({ message: "Address not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedAddress});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Address ⤴️" });
    }
}

//delete address
export const deleteAddress = async (req: Request, res: Response) => {
    const Address_Id = parseInt(req.params.id);  
    if (isNaN(Address_Id)) {
        res.status(400).json({ error: "Invalid 🚫 address ID 🏠" });
        return;
    }
    try {
        const existingAddress = await getAddressByIdServices(Address_Id)

        if(!existingAddress){
            res.status(200).json({message: "Address 🏠 does not exit 🤷‍♂️"})
            return;
        }
        const deleteAddress = await deleteAddressServices(Address_Id);
        if (deleteAddress) {
            res.status(200).json({message:deleteAddress});
        } else {
            res.status(404).json({ message: "Address not found 🔍" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed 🚫 to delete address 🏠" });
    }    
}