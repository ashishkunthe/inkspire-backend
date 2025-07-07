import { Router } from "express";
import { registerUser } from "../controllers/authController";

const routes = Router();

routes.post("/auth/register", registerUser);

export default routes;
