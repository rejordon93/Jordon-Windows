import { NextRequest } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/app/lib/validators";
import { apiSuccess, unauthorized, handleError } from "@/app/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) return unauthorized("Invalid email or password");

    const isValid = await bcryptjs.compare(data.password, user.password);
    if (!isValid) return unauthorized("Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return apiSuccess(
      {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful"
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}
