import { auth } from "@/auth";
import { getCards } from "@/lib/get-cards";
import prisma from "@/lib/prisma";
import { CreateCard } from "@/services/dto/card.dto";
import { NextRequest, NextResponse } from "next/server";
import randomColor from "randomcolor";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    const cards = await getCards(session.user.id);
    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const body = (await req.json()) as CreateCard;

    const newCard = await prisma.card.create({
      data: {
        color: randomColor({ luminosity: "dark" }),
        userId: session.user.id,
        name: body.name,
      },
    });

    const cards = await getCards(session.user.id);

    if (cards.length === 1) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          selectedCardId: newCard.id,
        },
      });
    }

    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
  }
}
