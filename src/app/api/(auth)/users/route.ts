import connect from "@/lib/backend/db";
import User from "@/lib/backend/modals/users";
import { Types, Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error in fetching users: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error in creating user: " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, username } = body;
    await connect();

    if (!userId || !username) {
      return new NextResponse("Missing userId or username", {
        status: 400,
      });
    }

    if(!Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid userId", {
        status: 400,
      });
    }

    const updateUser = await User.findOneAndUpdate(
        {_id: new Types.ObjectId(userId)},
        { username },
        { new: true }
    )


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error in updating user: " + error.message, {
      status: 500,
    });
  }
};
