// src/app/api/services/route.ts
import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { apiSuccess, unauthorized, handleError } from "@/app/lib/errors";
import { serviceSchema } from "@/app/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = getDataFromToken(req);

    if (!userId) {
      return unauthorized("You must be logged in to create a service");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return unauthorized("Invalid user");
    }

    // Validate service input
    const data = serviceSchema.parse(body);

    // Create service
    const service = await prisma.service.create({
      data: {
        serviceType: data.serviceType,
        description: data.description,
        price: data.price,
      },
    });

    return apiSuccess(service, "Service created successfully");
  } catch (error) {
    return handleError(error);
  }
}
