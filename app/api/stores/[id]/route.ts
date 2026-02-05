import { auth } from "@/auth";
import { getStoresByUserId } from "@/lib/get-stores";
import prisma from "@/lib/prisma";
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
