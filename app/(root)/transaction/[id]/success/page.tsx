import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { TransactionStatus } from "@prisma/client";
import { SmileIcon } from "lucide-react";
import { notFound, redirect, RedirectType } from "next/navigation";

export default async function TransactionSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();

  const { id } = await params;
  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      status: TransactionStatus.CONFIRMED,
    },
  });

  if (!transaction) notFound();

  redirect(transaction.returnUrl || "#", RedirectType.push);

  return (
    <div className="flex flex-col gap-10 items-center mt-10">
      <div className="flex flex-col gap-5 items-center">
        <SmileIcon
          color="#aadb7f"
          size={64}
          className="p-3 rounded-md bg-emerald-600"
        />
        <h1 className="font-bold text-3xl">Transaction confirmed</h1>
      </div>
      <p className="text-muted-foreground">
        Now you will be redirect back to the site.
        <br />
        If it doesnt happen, Click on the button
      </p>
      <Button className="w-96">Go to the site</Button>
    </div>
  );
}
