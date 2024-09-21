import dbConnect from "@/app/lib/mongodb";
import Property from "@/app/models/property";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    postedDate,
    postedBy,
    category,
    type,
    price,
    location,
    bed,
    bath,
    car,
  } = await request.json();

  await dbConnect();
  await Property.create({
    postedDate,
    postedBy,
    category,
    type,
    price,
    location,
    bed,
    bath,
    car,
  });
  return NextResponse.json({ message: "Property created" }, { status: 201 });
}
