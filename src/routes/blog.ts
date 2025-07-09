import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBlog, getBlogs } from "../controllers/blogController";

const routes = Router();

routes.post("/blog", authMiddleware, createBlog as any);
routes.get("/blog", authMiddleware, getBlogs);

export default routes;
