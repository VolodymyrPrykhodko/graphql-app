import mongoose from "mongoose";
import { Schema } from "mongoose";

const authorSchema = new Schema({
  name: String,
  age: Number,
});

export const Author = mongoose.model("Author", authorSchema);
