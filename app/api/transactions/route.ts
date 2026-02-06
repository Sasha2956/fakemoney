import prisma from "@/lib/prisma";
import { CreateTransactionRequest } from "@/services/dto/transaction.dto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const apiKey = headersList.get("Authorization");
    const request = await req.json();
    const body = {
      ...request,
      returnUrl: request.return_url,
    } as CreateTransactionRequest;

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key is not assigned" },
        { status: 500 },
      );
    }

    const store = await prisma.store.findFirst({
      where: {
        apiKey,
      },
    });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 500 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        storeId: store.id,
        amount: body.amount,
        returnUrl: body.returnUrl,
        description: body.description,
      },
    });

    const confirmationUrl = `${process.env.NEXT_PUBLIC_URL}/transaction/${transaction.id}`;

    return NextResponse.json({
      id: transaction.id,
      confirmation_url: confirmationUrl,
      status: transaction.status,
      amount: transaction.amount,
      metadata: body.metadata,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
