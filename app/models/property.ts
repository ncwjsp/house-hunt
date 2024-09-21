import { Schema, Document, models, model } from "mongoose";

export interface PropertyDocument extends Document {
  // userid: string;
  _id: string;
  postedDate: Date;
  postedBy: string;
  category: "sale" | "rent";
  type: string;
  price: number;
  location: string;
  bed: number;
  bath: number;
  car: number;
}

const PropertySchema: Schema<PropertyDocument> = new Schema(
  {
    // userid: {
    //   type: String,
    //   required: true,
    // },
    postedDate: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
    },
    bath: {
      type: Number,
      required: true,
    },
    car: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Property =
  models.Property || model<PropertyDocument>("Property", PropertySchema);

export default Property;
