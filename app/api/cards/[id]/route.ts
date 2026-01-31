import { auth } from "@/auth";
import { getCards } from "@/lib/get-cards";
import prisma from "@/lib/prisma";
import { UpdateCard } from "@/services/dto/card.dto";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
      include: {
        user: true,
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

    if (card.user.selectedCardId === card.id) {
      const newSelectedCard = await prisma.card.findFirst({
        where: {
          userId: session.user.id,
        },
      });

      if (newSelectedCard) {
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            selectedCardId: newSelectedCard.id,
          },
        });
      }
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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

    if (body.amount) {
      await prisma.card.update({
        where: {
          id,
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
          selectedCardId: id,
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
