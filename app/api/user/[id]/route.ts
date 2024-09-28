import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  const { newName: name, newEmail: email } = await request.json();
  await dbConnect();
  await User.findByIdAndUpdate(id, {
    name,
    email,
  });
  return NextResponse.json(
    { message: "User details updated" },
    { status: 200 }
  );
}

export async function GET(request: NextRequest, { params }: any) {
  const { id } = params;
  await dbConnect();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
