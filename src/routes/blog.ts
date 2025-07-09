import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBlog, getBlogs } from "../controllers/blogController";

const routes = Router();

routes.post("/blogs", authMiddleware, createBlog as any);
routes.get("/blogs", authMiddleware, getBlogs);
routes.get("/blogs/:id");

export default routes;
