import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBlog } from "../controllers/blogController";

const routes = Router();

routes.post("/blog", authMiddleware, createBlog as any);

export default routes;
