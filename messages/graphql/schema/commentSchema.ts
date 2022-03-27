import { buildSchema } from "graphql";

const commentSchema = buildSchema(
  `
 type Mutation{
  createComment(message: String,receiver: String,sender: String ):Comment
  }

  type Comment{
    _id: ID!,
    message:String,
    sender:String,
    receiver:String
  }

  type Query{
    _dummy: String
  }
  `
);

export default commentSchema;
