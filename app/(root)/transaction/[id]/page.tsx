import { ConfirmationCard } from "@/components/confirmation-card";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { TransactionStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();

  const { id } = await params;
  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      status: TransactionStatus.PENDING,
    },
  });

  if (!transaction) notFound();

  return (
    <div className="flex justify-center mt-2">
      <ConfirmationCard transaction={transaction} />
    </div>
  );
}
