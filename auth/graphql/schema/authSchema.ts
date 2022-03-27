import { buildSchema } from "graphql";

const authSchema = buildSchema(
  `
  type Mutation{
    register(password: String!, email: String!):RegisteredUser
    login(password: String!, email:String!):RegisteredUser
  }
  type RegisteredUser{
    email: String,
    jwt: String
  }
  type Query{
    _dummy: String
  }
  `
);

export default authSchema;
