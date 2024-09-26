import dbConnect from "@/app/lib/mongodb";
import Property from "@/app/models/property";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  const {
    newName: name,
    newPrice: price,
    newCategory: category,
    newLocation: location,
    newBed: bed,
    newBath: bath,
    newCar: car,
    newImages: images,
    newProvince: province,
  } = await request.json();
  await dbConnect();
  await Property.findByIdAndUpdate(id, {
    name,
    price,
    category,
    location,
    bed,
    bath,
    car,
    images,
    province,
  });
  return NextResponse.json({ message: "Property updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }) {
  const { id } = params;
  await dbConnect();
  const property = await Property.findOne({ _id: id });
  return NextResponse.json({ property }, { status: 200 });
}
