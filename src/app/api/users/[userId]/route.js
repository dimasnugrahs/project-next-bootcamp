// import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const db = new PrismaClient();

// Get user by id
export async function GET(req, { params }) {
  try {
    //Get user by id
    const user = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    //Check if user is found
    if (!user) {
      return new NextResponse("user Not Found", { status: 404 });
    }

    //Return user to client
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

//  Update user by id
export async function PATCH(req, { params }) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    //Get user by id
    const user = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    //Check if category is found
    if (!user) {
      return new NextResponse("user Not Found", { status: 404 });
    }

    //Get name user from body
    const {
      title,
      price,
      description,
      category_id,
      user_id,
      stock,
      shipping,
      featured,
      color,
      company,
      images,
    } = await req.json();

    //Update user
    const updateuser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        title: title,
        price: price,
        description: description,
        category_id: category_id,
        user_id: user_id,
        stock: stock,
        shipping: shipping,
        featured: featured,
        colors: color,
        company: company,
        images: images,
      },
    });

    //Return user to client
    return NextResponse.json(updateuser, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

// Delete user by id
export async function DELETE(req, { params }) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    //Get user by id
    const user = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    //Check if user is found
    if (!user) {
      return new NextResponse("user Not Found", { status: 404 });
    }

    //Delete user
    await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    //Return user to client
    return NextResponse.json("user deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
