"use server";
import dbConnect from "@/app/lib/mongodb";
import Property from "@/app/models/property";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      category,
      name,
      price,
      location,
      bed,
      bath,
      car,
      images,
      province,
    } = await request.json();

    await dbConnect();

    await Property.create({
      email,
      category,
      name,
      price,
      location,
      bed,
      bath,
      car,
      images,
      province,
    });

    return NextResponse.json({ message: "Property created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { message: "Error creating property" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const properties = await Property.find();

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await dbConnect();
  await Property.findByIdAndDelete(id);
  return NextResponse.json({ message: "Property deleted" }, { status: 200 });
}
