import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const SignUpvalidator = withZod(
  z.object({
    first_name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(5, { message: "Name must be at least 5 characters" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
  })
);

export const SignInValidator = withZod(
  z.object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
  })
);
