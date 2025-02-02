import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long").trim(),
    email: z.string().email("Invalid email").trim(),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number").optional()
})