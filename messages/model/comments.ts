import * as mongoose from "mongoose";

interface CommentAttributes {
  message: string;
  sender: string;
  receiver: string;
}

interface CommentDocument extends mongoose.Document {
  message: string;
  sender: string;
  receiver: string;
}

interface CommentsModel extends mongoose.Model<CommentDocument> {
  build(attr: CommentAttributes): CommentDocument;
}

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: false,
  },
  receiver: {
    type: String,
    required: false,
  },
});

commentSchema.statics.build = (attr: CommentAttributes) => {
  return new Comment(attr);
};

const Comment = mongoose.model<CommentDocument, CommentsModel>(
  "Comment",
  commentSchema
);

export { Comment };
