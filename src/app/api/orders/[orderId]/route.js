import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Get order by id and include order_items in order and include product in order_items
export async function GET(req, { params }) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    //Get order by id
    const order = await db.order.findFirst({
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
      where: {
        id: params.orderId,
      },
    });

    //Check if order is found
    if (!order) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Return order to client
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

// Delete order by id
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

    //Get order by id
    const order = await db.order.findFirst({
      where: {
        id: params.orderId,
      },
    });

    //Check if order is found
    if (!order) {
      return new NextResponse("Order Not Found", { status: 404 });
    }

    //Delete order
    await db.order.delete({
      where: {
        id: params.orderId,
      },
    });

    //Return order to client
    return NextResponse.json("Order deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
