import { Request, Response } from "express";
import { getCommentsServices, getCommentByIdServices, createCommentServices, updateCommentServices, deleteCommentServices } from "./comment.service";



//createComment
export const createComment = async (req: Request, res: Response) => {
    const { Order_Id , User_Id , Comment_Text, Is_Complaint, Is_Praise } = req.body;
    if (!Order_Id || !User_Id || !Comment_Text || !Is_Complaint || !Is_Praise) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const newComment = await createCommentServices({ Order_Id, User_Id, Comment_Text, Is_Complaint, Is_Praise });
        if (newComment == null) {
            res.status(500).json({ message: "Failed 🙆‍♂️ to create Comment 💬" });
        } else {
            res.status(201).json({message:newComment});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to create Comment 💬" });
    }
}
//get Comments
export const getComments = async (req: Request, res: Response) => {
    try {
        const allComments = await getCommentsServices();
        if (allComments == null || allComments.length == 0) {
          res.status(404).json({ message: "No Comments found 🔍" });
        }else{
            res.status(200).json(allComments);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch ⤴️ Comments 💬" });
    }
}

//getCommentById
export const getCommentById = async (req: Request, res: Response) => {
    const Comment_Id = parseInt(req.params.id);
    if (isNaN(Comment_Id)) {
        res.status(400).json({ error: "Invalid 🙅‍♂️ Comment ID 💬" });
         return; 
    }
    try {
        const comment = await getCommentByIdServices(Comment_Id);
        if (comment == null) {
            res.status(404).json({ message: "Comment not found 🔍" });
        } else {
            res.status(200).json(comment);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🙆‍♂️ to fetch Comment 💬" });
    }
}

//update Comment
export const updateComment = async (req: Request, res: Response) => {
    const Comment_Id = parseInt(req.params.id);
    if (isNaN(Comment_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Comment ID 💬" });
        return; 
    }
    const { Order_Id , User_Id , Comment_Text, Is_Complaint, Is_Praise } = req.body;
    if (!Order_Id || !User_Id || !Comment_Text || !Is_Complaint || !Is_Praise) {
        res.status(400).json({ error: "All fields ⛓️‍💥 are required" });
        return; 
    }
    try {
        const updatedComment = await updateCommentServices(Comment_Id, { Order_Id , User_Id , Comment_Text, Is_Complaint, Is_Praise });
        if (updatedComment == null) {
            res.status(404).json({ message: "Comment not found 🔍 or failed to update ⤴️" });
        } else {
            res.status(200).json({message:updatedComment});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Comment ⤴️" });
    }
}

//delete Comment
export const deleteComment = async (req: Request, res: Response) => {
    const Comment_Id = parseInt(req.params.id);
    if (isNaN(Comment_Id)) {
        res.status(400).json({ error: "Invalid 🚫 Comment ID 💬" });
        return;
    }
    try {
        const existingComment = await getCommentByIdServices(Comment_Id)

        if(!existingComment){
            res.status(200).json({message: "Comment 💬 does not exit 🤷‍♂️"})
            return;
        }
        const deleteComment = await deleteCommentServices(Comment_Id);
        if (deleteComment) {
            res.status(200).json({message:deleteComment});
        } else {
            res.status(404).json({ message: "Comment not found 🔍" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed 🚫 to delete Comment 💬" });
    }
}