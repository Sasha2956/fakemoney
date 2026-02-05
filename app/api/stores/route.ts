import { auth } from "@/auth";
import { getStoresByUserId } from "@/lib/get-stores";
import prisma from "@/lib/prisma";
import { createStoreSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !session?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const stores = await getStoresByUserId(session.user.id);

    return NextResponse.json(stores);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !session?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const fields = createStoreSchema.safeParse(await req.json());

    if (!fields.success) {
      return NextResponse.json({ message: "Invalid fields" }, { status: 500 });
    }

    const { name } = fields.data;

    const apiKey = crypto.randomUUID();

    await prisma.store.create({
      data: {
        name,
        userId: session.user.id,
        apiKey,
      },
    });
    const stores = await getStoresByUserId(session.user.id);

    return NextResponse.json(stores);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
