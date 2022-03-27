import { User } from "../../models/user";
import bcrypt from "bcrypt";
import JWT from "../../utils/jwt";

const resolvers = {
  login: async (
    { email, password }: { email: string; password: string },
    context: any
  ) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      context.res.status(404);
      throw new Error("User not found.");
    }
    const isCorrect = bcrypt.compare(password, user.password);
    if (!isCorrect) {
      context.res.status(401);
      throw new Error("Wrong password.");
    }
    const jwt = JWT.encode(user._id, user.email, 7200);
    return {
      email: email,
      jwt: jwt,
    };
  },
  register: async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    context: any
  ) => {
    const dbUser = await User.find({ email: email });
    if (dbUser) {
      context.res.status(400);
      throw new Error("Email exits.");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.build({ email: email, password: hashedPassword });
    await user.save();
    const jwt = JWT.encode(user._id, user.email, 7200);
    return {
      email: email,
      jwt: jwt,
    };
  },
};

export default resolvers;
