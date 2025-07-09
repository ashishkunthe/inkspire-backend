import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addComment,
  createBlog,
  getBlog,
  getBlogs,
} from "../controllers/blogController";

const routes = Router();

routes.post("/blogs", authMiddleware, createBlog as any);
routes.get("/blogs", authMiddleware, getBlogs);
routes.get("/blogs/:id", authMiddleware, getBlog as any);
routes.post("/blogs/:id/comments", authMiddleware, addComment as any);

export default routes;
