import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import { registerSchema } from "@/app/lib/validators";
import { apiSuccess, unauthorized, handleError } from "@/app/lib/errors"; // reuse helpers

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) return unauthorized("User already exists");

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        isOnline: false,
      },
    });

    return apiSuccess(
      {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      "User created successfully"
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}
