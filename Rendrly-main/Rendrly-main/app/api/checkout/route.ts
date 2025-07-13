import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const numberOdDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (numberOdDays <= 0) {
      return new NextResponse("Invalid date range", { status: 400 });
    }

    const totalAmount = Number(priceDay) * numberOdDays;
    const totalAmountStripe = Math.round(totalAmount * 100); // Convertir a centavos para Stripe

    // Obtener el carro para acceder a su nombre
    const car = await db.car.findUnique({
      where: {
        id: carId,
      },
    });

    if (!car) {
      return new NextResponse("Car not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "DOP",
          product_data: {
            name: carName,
          },
          unit_amount: totalAmountStripe,
        },
      },
    ];

    const order = await db.order.create({
      data: {
        carId,
        carName: carName,
        userId: userId,
        status: "confirmed",
        totalAmount: totalAmount,
        orderDate: start,
        orderEndDate: end,
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
      metadata: {
        orderId: order.id,
        carId: carId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        numberOdDays: numberOdDays.toString(),
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
