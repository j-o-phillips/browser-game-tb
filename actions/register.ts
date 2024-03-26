"use server";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcryptjs"; //or from bcrypt if you have errors

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name: username,
      email,
      hashedPassword,
      ship: {
        create: {
          shipEngine: {
            create: {},
          },
          shipCargoBay: {
            create: {},
          },
        },
      },
    },
  });

  //TODO: Send verification token email

  return { success: "User created!" };
};
