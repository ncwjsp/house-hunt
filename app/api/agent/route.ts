"use server";
import dbConnect from "@/app/lib/mongodb";
import Agent from "@/app/models/agent";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, detail, user } = await request.json();

    await dbConnect();

    await Agent.create({
      name,
      detail,
      user,
    });

    return NextResponse.json({ message: "Agent created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { message: "Error creating agent" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const agents = await Agent.find();

    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await dbConnect();
  await Agent.findByIdAndDelete(id);
  return NextResponse.json({ message: "Agent deleted" }, { status: 200 });
}
