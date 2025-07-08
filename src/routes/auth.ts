import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

const routes = Router();

routes.post("/auth/register", registerUser);
routes.post("/auth/login", loginUser);

export default routes;
