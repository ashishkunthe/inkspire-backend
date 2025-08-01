import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  Likes,
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  editBlog,
  getBlog,
  getBlogs,
} from "../controllers/blogController";

const routes = Router();

routes.post("/blogs", authMiddleware, createBlog as any);
routes.get("/blogs", authMiddleware, getBlogs);
routes.get("/blogs/:id", authMiddleware, getBlog as any);
routes.put("/blogs/:id", authMiddleware, editBlog as any);
routes.delete("/blogs/:id", authMiddleware, deleteBlog as any);
routes.post("/blogs/:id/comments", authMiddleware, addComment as any);
routes.delete(
  "/blogs/:id/comments/:commentId",
  authMiddleware,
  deleteComment as any
);
routes.patch("/blogs/:id/likes", authMiddleware, Likes as any);

export default routes;
