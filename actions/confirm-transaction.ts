"use server";

import prisma from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";

interface ReturnProps {
  error?: string;
  url?: string;
}

export const confirmTransaction = async (
  cardId: string,
  transactionId: string,
): Promise<ReturnProps> => {
  try {
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return { error: "No card" };
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        status: TransactionStatus.PENDING,
      },
    });

    if (!transaction) {
      return { error: "No transaction or it is already confirmed" };
    }

    if (Number(card.amount) < transaction.amount) {
      return { error: "Insufficient funds" };
    }

    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        fromId: cardId,
        status: TransactionStatus.CONFIRMED,
      },
    });

    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        amount: { decrement: transaction.amount },
      },
    });

    await prisma.store.update({
      where: {
        id: transaction.storeId!,
      },
      data: {
        revenue: { increment: transaction.amount },
      },
    });

    const successUrl = `/transaction/${transaction.id}/success`;

    return { url: successUrl };
  } catch (err) {
    console.error(err);
    return { error: "Unknown error" };
  }
};
