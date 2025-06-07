import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { State_Table , TState_TableInsert ,TState_TableSelect} from "../drizzle/schema";


//CRUD Operations for State entity

//Get all States
export const getStatesServices = async():Promise<TState_TableSelect[] | null> => {
    return await db.query.State_Table.findMany({});
}

//Get State by ID
export const getStateByIdServices = async(State_Id: number):Promise<TState_TableSelect | undefined> => {
     return await db.query.State_Table.findFirst({
        where: eq(State_Table.State_Id, State_Id)
    })  
}

// Create a new State
export const createStateServices = async(state: TState_TableInsert):Promise<string> => {
    await db.insert(State_Table).values(state).returning();
    return "State 🪧 created successfully 🌟";
}

// Update an existing State
export const updateStateServices = async(State_Id: number, state: Partial<TState_TableInsert>):Promise<string> => {
    await db.update(State_Table).set(state).where(eq(State_Table.State_Id, State_Id));
    return "State 🪧 updated successfully 🌟";
}


// Delete a State

export const deleteStateServices = async(State_Id: number):Promise<string> => {
  await db.delete(State_Table).where(eq(State_Table.State_Id, State_Id));
  return "State 🪧 deleted successfully 🫡"
}