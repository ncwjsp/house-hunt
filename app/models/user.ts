import { Schema, Document, models, model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profileImg?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>("User", UserSchema);

export default User;
