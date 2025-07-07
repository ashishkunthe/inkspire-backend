import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog", default: [] }],
});

const User = mongoose.model("User", userModel);

export default User;
