import dbConnect from "@/app/lib/mongodb";
import Agent from "@/app/models/agent";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  const { newName: name, newDetail: detail } = await request.json();
  await dbConnect();
  await Agent.findByIdAndUpdate(id, {
    name,
    detail,
  });
  return NextResponse.json({ message: "Agent updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }) {
  const { id } = params;
  await dbConnect();
  const agent = await Agent.findOne({ _id: id });
  return NextResponse.json({ agent }, { status: 200 });
}
