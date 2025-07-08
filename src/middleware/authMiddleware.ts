import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    res.json({
      message: "no credentials ",
    });
    return;
  }

  try {
    const decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    if (!decode) {
      res.json({
        message: "invalide credentials",
      });
      return;
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("something went wrong", error);
    res.status(401).json({
      messgae: "something went wrong",
    });
  }
}
