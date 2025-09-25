import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { bookingSchema } from "@/app/lib/validators";
import { unauthorized, apiSuccess, handleError } from "@/app/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const userId = getDataFromToken(req);
    if (!userId) return unauthorized("You must be logged in to book");

    const booking = await prisma.booking.create({
      data: {
        customerId: userId,
        serviceId: data.serviceId,
        date: data.date,
        status: "PENDING", // user bookings are always pending
      },
    });

    return apiSuccess(booking, "Booking created successfully");
  } catch (error) {
    return handleError(error);
  }
}
