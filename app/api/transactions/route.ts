import prisma from "@/lib/prisma";
import { CreateTransactionRequest } from "@/services/dto/transaction.dto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const authorization = headersList.get("Authorization");
    const request = await req.json();
    const body = {
      ...request,
      returnUrl: request.return_url,
    } as CreateTransactionRequest;

    if (!authorization) {
      return NextResponse.json(
        { message: "Authorization header is required" },
        { status: 401 },
      );
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return NextResponse.json(
        { message: "Invalid authorization format. Use: Bearer <API_KEY>" },
        { status: 401 },
      );
    }

    const apiKey = token;

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
        metadata: body.metadata || undefined,
      },
    });

    const confirmationUrl = `${process.env.NEXT_PUBLIC_URL}/transaction/${transaction.id}`;

    return NextResponse.json({
      id: transaction.id,
      confirmation_url: confirmationUrl,
      status: transaction.status,
      amount: transaction.amount,
      metadata: transaction.metadata,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
