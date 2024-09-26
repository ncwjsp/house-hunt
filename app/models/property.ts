import { Schema, Document, models, model } from "mongoose";

export interface PropertyDocument extends Document {
  // userid: string;
  _id: string;
  email: string;
  category: "sale" | "rent";
  name: string;
  price: number;
  location: string;
  bed: number;
  bath: number;
  car: number;
  province: string;
  images: string[];
}

const PropertySchema: Schema<PropertyDocument> = new Schema(
  {
    // userid: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["sale", "rent"],
    },
    name: {
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
    province: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Property =
  models.Property || model<PropertyDocument>("Property", PropertySchema);

export default Property;
