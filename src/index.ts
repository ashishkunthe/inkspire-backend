import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
