"use server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, profileImg } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, profileImg });

    return NextResponse.json({ message: "registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering" },
      { status: 500 }
    );
  }
}
