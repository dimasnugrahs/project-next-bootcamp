// import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const db = new PrismaClient();

// Get product by id
export async function GET(req, { params }) {
  try {
    //Get product by id
    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
    });

    //Check if product is found
    if (!product) {
      return new NextResponse("Product Not Found", { status: 404 });
    }

    //Return product to client
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

//  Update product by id
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

    //Get product by id
    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
    });

    //Check if category is found
    if (!product) {
      return new NextResponse("Product Not Found", { status: 404 });
    }

    //Get name product from body
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

    //Update product
    const updateProduct = await db.product.update({
      where: {
        id: params.productId,
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

    //Return product to client
    return NextResponse.json(updateProduct, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

// Delete product by id
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

    //Get product by id
    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
    });

    //Check if product is found
    if (!product) {
      return new NextResponse("Product Not Found", { status: 404 });
    }

    //Delete product
    await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    //Return product to client
    return NextResponse.json("Product deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
