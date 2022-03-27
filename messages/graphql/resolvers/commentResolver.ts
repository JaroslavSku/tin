import { Comment } from "../../model/comments";
import parseToken from "../../model/parseToken";

const commentResolvers = {
  createComment: async (
    {
      message,
      receiver,
      sender,
    }: {
      message: string;
      receiver: string;
      sender: string;
    },
    context: any
  ) => {
    const userData = parseToken(context.req);
    if (userData.isError()) {
      context.res.status(userData.status);
      throw userData.getError();
    }
    const comment = Comment.build({
      message: message,
      sender: sender,
      receiver: receiver,
    });
    const createdComment = await comment.save();

    return createdComment;
  },
};

export default commentResolvers;
