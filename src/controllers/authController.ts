import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(409).json({
        message: "the user already exist",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "user registered sucessfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " something went wrong! please try again ",
    });
  }
}
