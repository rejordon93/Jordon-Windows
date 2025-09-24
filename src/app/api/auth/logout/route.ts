import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { apiSuccess, unauthorized, handleError } from "@/app/lib/errors"; // reuse helpers

export async function DELETE(req: NextRequest) {
  try {
    const userToken = getDataFromToken(req);

    // Validate the token
    if (!userToken) {
      return unauthorized("Unauthorized: No valid token found");
    }
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // update isOnlue to false
    await prisma.user.update({
      where: { id: userToken },
      data: {
        isOnline: false,
      },
    });

    return apiSuccess(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError(error);
    }
  }
}
