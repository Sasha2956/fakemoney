"use server";

import prisma from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";
import axios from "axios";

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
      include: {
        store: true,
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

    if (transaction.store?.callbackUrl) {
      try {
        await axios.post(transaction.store?.callbackUrl, {
          event: "payment_successfull",
          data: {
            id: transaction.id,
            description: transaction.description,
            status: transaction.status,
            metadata: transaction.metadata,
            amount: transaction.amount,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    return { url: successUrl };
  } catch (err) {
    console.error(err);
    return { error: "Unknown error" };
  }
};
