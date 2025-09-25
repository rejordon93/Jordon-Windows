import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username too short")
    .max(50, "Username too long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
});

export const serviceSchema = z.object({
  serviceType: z.string().min(2).max(50),
  description: z.string().min(5).max(250).optional(),
  price: z.number().min(0), // prices must be positive numbers
});

export const guestBookingSchema = z.object({
  name: z.string().min(2, "Name too short").max(50, "Name too long"),
  email: z.string().email("Invalid email format"),
  serviceId: z.number(), // link to a service
  date: z.string(), // ISO string from frontend; will convert to Date in API
});
export const bookingSchema = z.object({
  customerId: z.number().optional(), // optional for guest bookings
  serviceId: z.number(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)), // convert string to Date
  status: z.enum(["PENDING", "APPROVED", "COMPLETED"]).optional(), // optional, default handled in Prisma
});

export const approveSchema = z.object({
  serviceId: z.number().int(),
  approved: z.boolean(), // true = approve, false = reject
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type updateProfileInput = z.infer<typeof updateProfileSchema>;
export type servuceInput = z.infer<typeof serviceSchema>;
export type GuestBookingInput = z.infer<typeof guestBookingSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type approveInput = z.infer<typeof approveSchema>;
