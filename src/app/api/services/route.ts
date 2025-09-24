import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { apiSuccess, handleError } from "@/app/lib/errors";
import { serviceSchema, guestBookingSchema } from "@/app/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tokenUser = getDataFromToken(req);

    const existingUser = tokenUser
      ? await prisma.user.findUnique({ where: { id: tokenUser } })
      : null;

    if (existingUser) {
      // Registered user path
      const data = serviceSchema.parse(body);
      const service = await prisma.service.create({
        data: {
          serviceType: data.serviceType,
          description: data.description,
          price: data.price,
        },
      });
      return apiSuccess(service, "Service created");
    } else {
      // Guest path
      const guestData = guestBookingSchema.parse(body);
      const guestBooking = await prisma.guestBooking.create({
        data: {
          name: guestData.name,
          email: guestData.email,
          serviceId: guestData.serviceId,
          date: new Date(guestData.date),
        },
      });
      return apiSuccess(guestBooking, "Guest booking created");
    }
  } catch (error) {
    return handleError(error);
  }
}
