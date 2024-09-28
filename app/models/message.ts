import mongoose, { Schema, Document, models, model } from "mongoose";

export interface MessageDocument extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  receiver: mongoose.Schema.Types.ObjectId;
  message: string;
}

const MessageSchema: Schema<MessageDocument> = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message =
  models.Message || model<MessageDocument>("Message", MessageSchema);

export default Message;
