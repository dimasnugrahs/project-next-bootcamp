import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    //Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    //Check if category is found
    if (!category) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Return category to client
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

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

    //Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    //Check if category is found
    if (!category) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Get name category from body
    const { name } = await req.json();

    //Update category
    const updateCategory = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: name,
      },
    });

    //Return category to client
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

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

    //Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    //Check if category is found
    if (!category) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Delete category
    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    //Return category to client
    return NextResponse.json("Category deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
