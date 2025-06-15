import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Comment_Table, TComment_TableInsert, TComment_TableSelect } from "../drizzle/schema";


//CRUD Operations for State entity

//Get all Comments
export const getCommentsServices = async():Promise<TComment_TableSelect[] | null> => {
    return await db.query.Comment_Table.findMany({
        with: {
            order: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            user: true
        }
    });
}

//Get Comment by ID
export const getCommentByIdServices = async(Comment_Id: number):Promise<TComment_TableSelect | undefined> => {
     return await db.query.Comment_Table.findFirst({
        where: eq(Comment_Table.Comment_Id, Comment_Id),
        with: {
            order: {
                with: {
                    restaurant: true,
                    items: {
                        with: {
                            menuItem: true
                        }
                    }
                }
            },
            user: true
        }
    })  
}

// Create a new Comment
export const createCommentServices = async(comment: TComment_TableInsert):Promise<string> => {
    await db.insert(Comment_Table).values(comment).returning();
    return "Comment 💬 created successfully 🌟";
}

// Update an existing Comment
export const updateCommentServices = async(Comment_Id: number, comment: Partial<TComment_TableInsert>):Promise<string> => {
    await db.update(Comment_Table).set(comment).where(eq(Comment_Table.Comment_Id, Comment_Id));
    return "Comment 💬 updated successfully 🌟";
}


// Delete a Comment

export const deleteCommentServices = async(Comment_Id: number):Promise<string> => {
  await db.delete(Comment_Table).where(eq(Comment_Table.Comment_Id, Comment_Id));
  return "Comment 💬 deleted successfully 🫡"
}