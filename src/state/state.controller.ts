import { Request, Response } from "express";
import { createStateServices, deleteStateServices, getStateByIdServices, getStatesServices, updateStateServices } from "./state.service";



//createstate
export const createState = async (req: Request, res: Response) => {
    const {State_Name , Code } = req.body;
    if (!State_Name || !Code) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newState = await createStateServices({State_Name , Code });
        if (newState == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create State 🪧" });
        } else {
            res.status(201).json({message:newState});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create State 🪧" });
    }
}
//get States
export const getStates = async (req: Request, res: Response) => {
    try {
        const allStates = await getStatesServices();
        if (allStates == null || allStates.length == 0) {
          res.status(404).json({ message: "No States found 🔍" });
        }else{
            res.status(200).json(allStates);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ States 🪧" });
    }
}

//getstatebyid
export const getStateById = async (req: Request, res: Response) => {
    const State_Id = parseInt(req.params.id);
    if (isNaN(State_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ State ID 🪧" });
         return; 
    }
    try {
        const state = await getStateByIdServices(State_Id);
        if (state == null) {
            res.status(404).json({ message: "State not found 🔍" });
        } else {
            res.status(200).json(state);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch state 🪧" });
    }
}

//update state
export const updateState = async (req: Request, res: Response) => {
    const State_Id = parseInt(req.params.id);
    if (isNaN(State_Id)) {
        res.status(400).json({ error: "Invalid 🚫 state ID 🪧" });
        return; 
    }
    const {State_Name , Code  } = req.body;
    if (!State_Name || !Code) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedState = await updateStateServices(State_Id, { State_Name , Code });
        if (updatedState == null) {
            res.status(404).json({ message: "States not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedState});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update State ⤴️" });
    }
}

//delete state
export const deleteState = async (req: Request, res: Response) => {
    const State_Id = parseInt(req.params.id);  
    if (isNaN(State_Id)) {
        res.status(400).json({ error: "Invalid 🚫 state ID 🪧" });
        return;
    }
    try {
        const existingState = await getStateByIdServices(State_Id)

        if(!existingState){
            res.status(200).json({message: "State🪧 does not exit 🤷‍♂️"})
            return;
        }
        const deleteState = await deleteStateServices(State_Id);
        if (deleteState) {
            res.status(200).json({message:deleteState});
        } else {
            res.status(404).json({ message: "State not found 🔍" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed 🚫 to delete state 🪧" });
    }    
}