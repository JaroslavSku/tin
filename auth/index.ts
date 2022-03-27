import express from "express";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./graphql/resolvers/resolvers";
import authSchema from "./graphql/schema/authSchema";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  "/auth/graphql",
  graphqlHTTP((req, res) => ({
    schema: authSchema,
    rootValue: resolvers,
    context: {
      req: req,
      res: res,
    },
  }))
);

mongoose
  .connect("mongodb://auth-mongo-srv:27017/tin")
  .then((_) => {
    console.log("auth listening on the port 4000");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
