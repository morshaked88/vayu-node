import { z } from "zod";

//scema for query parameters
export const querySchema = z.object({
  limit: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Limit must be a number",
    })
    .optional(),
  offset: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Offset must be a number",
    })
    .optional(),
  name: z
    .string()
    .min(1)
    .trim()
    .refine((val: string) => val.trim().length > 0, {
      message: "Name cannot be empty",
    })
    .optional(),
  email: z
    .string()
    .email()
    .min(1)
    .trim()
    .refine((val: string) => val.trim().length > 0, {
      message: "Email cannot be empty",
    })
    .optional(),
});
