// src/app/api/admin/services/approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { handleError } from "@/app/lib/errors";
import { approveSchema } from "@/app/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, approved } = approveSchema.parse(body);

    // update service status
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        status: approved ? "APPROVED" : "REJECTED",
      },
    });

    return NextResponse.json({ success: true, service: updatedService });
  } catch (error) {
    return handleError(error);
  }
}
