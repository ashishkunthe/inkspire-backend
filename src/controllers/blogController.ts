import { Request, Response } from "express";
import Blog from "../models/Blogs";
import User from "../models/User";
import { Types } from "mongoose";

interface RequestExtend extends Request {
  userId: string | Types.ObjectId;
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
      .populate("author", "username email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username" },
      });

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

export async function getBlog(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id)
      .populate("author", "username email")
      .populate("comments.user", "username");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({ blog: blog });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function addComment(req: RequestExtend, res: Response) {
  const userId = req.userId;
  const id = req.params.id;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    blog.comments.push({ user: userId, text: text });
    await blog.save();

    res.status(200).json({
      status: true,
      message: "comment added",
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function Likes(req: RequestExtend, res: Response) {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const liked = blog?.likes.includes(new Types.ObjectId(userId));

    if (liked) {
      blog.likes = blog?.likes.filter(
        (likeUserId) => likeUserId.toString() !== userId.toString()
      );
    } else {
      blog?.likes.push(new Types.ObjectId(userId));
    }
    await blog?.save();
    res.json({
      success: true,
      message: liked ? "Unliked the blog" : "Liked the blog",
      likeCount: blog.likes.length,
    });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function editBlog(req: RequestExtend, res: Response) {
  const userId = req.userId;
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        message: "Blog not found",
      });
      return;
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not the author" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteBlog(req: RequestExtend, res: Response) {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not the author" });
    }

    await Blog.findByIdAndDelete(id);

    await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blog._id },
    });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteComment(req: RequestExtend, res: Response) {
  const blogId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment?.user?.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the comment author" });
    }

    blog.comments.pull(commentId);

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
