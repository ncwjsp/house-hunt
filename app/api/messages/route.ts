import dbConnect from "@/app/lib/mongodb";
import Conversation from "@/app/models/conversation";
import Message from "@/app/models/message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sender, message } = await req.json();
    const receiver = req.nextUrl.searchParams.get("receiver");

    await dbConnect();

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
      });
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    return NextResponse.json({ message: "Message sent" }, { status: 201 });
  } catch (error) {
    console.error("Error in sending message:", error.message);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }) {
  try {
    const senderId = session?.user?.id;
    const { id: userToChatId } = params;

    await dbConnect();

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return NextResponse.json([], { status: 200 });
    }

    const messages = conversation.messages;

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error in fetching messages:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
