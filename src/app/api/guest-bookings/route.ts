import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { unauthorized, apiSuccess, handleError } from "@/app/lib/errors";
import { z } from "zod";

const approveSchema = z.object({
  bookingId: z.number().int(),
  approved: z.boolean(), // true = approve, false = reject
  isGuest: z.boolean().optional(), // true if approving guest booking
});

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, approved, isGuest } = approveSchema.parse(body);

    const userId = getDataFromToken(req);
    const admin = userId
      ? await prisma.user.findUnique({ where: { id: userId } })
      : null;

    if (!admin || admin.role !== "ADMIN")
      return unauthorized("Only admins can approve bookings");

    const updatedBooking = isGuest
      ? await prisma.guestBooking.update({
          where: { id: bookingId },
          data: { status: approved ? "APPROVED" : "REJECTED" },
        })
      : await prisma.booking.update({
          where: { id: bookingId },
          data: { status: approved ? "APPROVED" : "REJECTED" },
        });

    return apiSuccess(updatedBooking, "Booking updated successfully");
  } catch (error) {
    return handleError(error);
  }
}
