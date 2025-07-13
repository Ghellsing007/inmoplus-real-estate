import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = await auth();
    const { carId } = params;
    const values = await request.json();

    if (!carId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const car = await db.car.update({
      where: {
        id: carId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR FORM ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
