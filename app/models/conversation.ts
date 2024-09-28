import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ConversationDocument extends Document {
  participants: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
  property: mongoose.Schema.Types.ObjectId;
}

const ConversationSchema: Schema<ConversationDocument> = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    // property: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Property",
    // },
  },
  { timestamps: true }
);

const Conversation =
  models.Conversation ||
  model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;
