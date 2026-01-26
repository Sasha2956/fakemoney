import { CardWithRelations } from "@/@types/prisma";
import prisma from "./prisma";

export const getCards = async (
  userId: string,
): Promise<CardWithRelations[]> => {
  const cards = await prisma.card.findMany({
    where: {
      userId: userId,
    },
    include: {
      receiveTransactions: true,
      sentTransactions: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return cards || [];
};
