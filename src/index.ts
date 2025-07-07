import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is runnig ${PORT}`);
});
