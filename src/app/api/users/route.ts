// src/app/api/users/route.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  const { email, name, password } = await req.json();
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
      },
    });
    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
