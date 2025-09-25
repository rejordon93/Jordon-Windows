import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { unauthorized, apiSuccess, handleError } from "@/app/lib/errors";

export async function PATCH(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const body = await req.json();
    const { bookingId } = body;

    const admin = userId
      ? await prisma.user.findUnique({ where: { id: userId } })
      : null;

    if (!admin || admin.role !== "ADMIN") {
      return unauthorized("Only admins can approve bookings");
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "APPROVED" },
    });

    return apiSuccess(booking, "Booking approved successfully");
  } catch (error) {
    return handleError(error);
  }
}
