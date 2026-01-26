import { auth } from "@/auth";
import { getCards } from "@/lib/get-cards";
import prisma from "@/lib/prisma";
import { UpdateCard } from "@/services/dto/card.dto";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id?: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const card = await prisma.card.findFirst({
      where: {
        id,
      },
    });
    if (!card) {
      return NextResponse.json({ message: "Card not found" });
    }

    await prisma.card.delete({
      where: {
        id,
      },
    });

    const cards = await getCards(session.user.id);

    return NextResponse.json(cards);
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const body = (await req.json()) as UpdateCard;

    const card = await prisma.card.findFirst({
      where: {
        id,
      },
    });

    if (!card) {
      return NextResponse.json({ message: "Card not found" });
    }

    if (body.amount !== undefined) {
      await prisma.card.update({
        where: {
          id: body.id,
        },
        data: {
          amount: { increment: body.amount },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          selectedCardId: body.id,
        },
      });
    }

    const cards = await getCards(session.user.id);

    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
