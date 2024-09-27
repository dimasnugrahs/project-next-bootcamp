import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt";

export async function POST(req) {
  try {
    //Get name on body
    const { name, password, email, access_token, role } = await req.json();

    //Create user with prisma
    const user = await db.user.create({
      data: {
        name: name,
        password: hashSync(password, 10),
        email: email,
        access_token: access_token,
        role: role,
      },
    });

    delete user.password;

    //Return category to the client
    return NextResponse.json({
      ...user,
    });
  } catch (err) {
    console.log(err);
    //Return error response
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    //Get all users
    const users = await db.user.findMany();

    //Return users to client
    return NextResponse.json(users, { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
