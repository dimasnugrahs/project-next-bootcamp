import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Get all products
export async function GET(req) {
  try {
    //Get all products
    const products = await db.product.findMany({
      include: {
        category: true,
      },
    });

    //Return category to client
    return NextResponse.json(products, { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Create a new product
export async function POST(req) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    //Get name on body
    const {
      title,
      price,
      description,
      category_id,
      user_id,
      stock,
      shipping,
      featured,
      colors,
      company,
      images,
    } = await req.json();

    //Create product with prisma
    const product = await db.product.create({
      data: {
        title: title,
        price: price,
        description: description,
        category_id: category_id,
        user_id: decoded.id,
        stock: Number(stock),
        shipping: shipping,
        featured: featured,
        colors: colors,
        company: company,
        images: images,
      },
    });

    //Return category to the client
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error.message);
    //Return error response
    return new NextResponse("Internal server error", { status: 500 });
  }
}
