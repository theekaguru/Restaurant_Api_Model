import { Router } from "express";
import { createComment, deleteComment, getCommentById, getComments, updateComment } from "./comment.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const commentRouter = Router();

// Comment routes definition

// Get all comments
commentRouter.get('/comments', /*adminRoleAuth */  getComments);

// Get comment by ID
commentRouter.get('/comments/:id',/* adminRoleAuth ,*/  getCommentById);

// Create a new comment
commentRouter.post('/comments', /*adminRoleAuth ,*/  createComment);

// Update an existing comment
commentRouter.put('/comments/:id',/* adminRoleAuth, */ updateComment);

// Delete an existing comment
commentRouter.delete('/comments/:id', /*adminRoleAuth ,*/ deleteComment);

// Get user by ID
commentRouter.get('/comments/:id',/* adminRoleAuth ,*/  getCommentById);

// Create a new user
commentRouter.post('/comments', /*adminRoleAuth ,*/  createComment);

// Update an existing user
commentRouter.put('/comments/:id',/* adminRoleAuth, */ updateComment);

// Delete an existing user
commentRouter.delete('/comments/:id', /*adminRoleAuth ,*/ deleteComment);