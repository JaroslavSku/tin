import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import commentSchema from "./graphql/schema/commentSchema";
import commentResolvers from "./graphql/resolvers/commentResolver";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  "/message/graphql",
  graphqlHTTP((req, res) => ({
    schema: commentSchema,
    rootValue: commentResolvers,
    context: {
      req: req,
      res: res,
    },
  }))
);

mongoose
  .connect("mongodb://auth-mongo-srv:27017/tin")
  .then((_) => {
    console.log("tickets micro listening on the port 4001");
    app.listen(4001);
  })
  .catch((err) => {
    console.log(err);
  });
