import { Schema, Document, models, model } from "mongoose";

export interface AgentDocument extends Document {
  name: string;
  detail: string;
  user: Schema.Types.ObjectId;
}

const AgentSchema: Schema<AgentDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Agent = models.Agent || model<AgentDocument>("Agent", AgentSchema);

export default Agent;
