import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export const Book = mongoose.model("Book", bookSchema);
