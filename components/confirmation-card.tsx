"use client";

import { Transaction } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { CardsDropdown } from "./cards-dropdown";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { confirmTransaction } from "@/actions/confirm-transaction";
import { useRouter } from "next/navigation";
import { TriangleAlertIcon } from "lucide-react";

interface Props {
  className?: string;
  transaction: Transaction;
}

export const ConfirmationCard = ({ className, transaction }: Props) => {
  const [selectedCardId, setSelectedCardId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickConfirm = async () => {
    try {
      setLoading(true);
      setError("")
      const data = await confirmTransaction(selectedCardId, transaction.id);
      if (data.error) {
        setError(data.error);
        toast.error("Error while confiming transaction.");
      } else {
        toast.success("Successfully confirmed transaction. Please wait.");
        router.push(data.url || "#");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while confiming transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("text-center w-96", className)}>
      <CardHeader>
        <p className="mb-2 text-muted-foreground">You need to pay:</p>
        <CardTitle className="text-5xl">${transaction.amount}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-muted-foreground">{transaction.description}</p>
        <div className="space-y-2">
          <p className="text-muted-foreground">Selected card to pay:</p>
          <CardsDropdown onChange={setSelectedCardId} className="w-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          isLoading={loading}
          onClick={() => onClickConfirm()}
          className="w-full mt-24"
        >
          Confirm payment
        </Button>
        {error && (
          <div className="bg-red-700/15 w-full text-destructive flex justify-center p-4 rounded-md gap-2 border border-destructive">
            <TriangleAlertIcon />
            <p>{error}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
