import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:0123456789@cluster0.2qx7mao.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Hello World!");
});
