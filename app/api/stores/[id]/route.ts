import { auth } from "@/auth";
import { getStoresByUserId } from "@/lib/get-stores";
import prisma from "@/lib/prisma";
import { UpdateStoreValues } from "@/services/dto/store.dto";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth();

    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.store.delete({
      where: {
        id,
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth();

    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as UpdateStoreValues;

    await prisma.store.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        callbackUrl: body.callbackUrl,
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
