import { Request, Response } from "express";
import Blog from "../models/Blogs";
import User from "../models/User";

interface RequestExtend extends Request {
  userId: string;
}

export async function createBlog(req: RequestExtend, res: Response) {
  const userId = req.userId;
  const { title, content } = req.body;

  try {
    const blog = await Blog.create({
      author: userId,
      title: title,
      content: content,
    });

    await User.findByIdAndUpdate(userId, { $push: { blogs: blog._id } });

    res.status(200).json({
      message: "blog created",
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "username email");

    res.status(200).json({
      success: true,
      message: "Fetched all blogs",
      blogs: blogs,
    });
  } catch (error) {
    console.log("something went wrong");
    res.status(500).json({
      message: "something went wrong",
    });
  }
}
