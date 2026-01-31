"use client";

import { useCardStore } from "@/store/card";
import { DashboardCard } from "./dashboard-card";
import { useEffect } from "react";
import { IncreaseCreditCardAmountButton } from "./increase-credit-card-amount-button";

export const BalanceCard = () => {
  const selectedCard = useCardStore((state) => state.selectedCard);
  const fetchCards = useCardStore((state) => state.fetchCards);
  const loading = useCardStore((state) => state.loading);
  const increaseCardAmountOrSetSelectedCard = useCardStore(
    (state) => state.increaseCardAmountOrSetSelectedCard,
  );

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  return (
    <DashboardCard
      title="Balance"
      description="Balance from selected card:"
      endAdorment={
        selectedCard && (
          <IncreaseCreditCardAmountButton
            onSubmit={(amount) =>
              increaseCardAmountOrSetSelectedCard({
                id: selectedCard?.id,
                amount,
              })
            }
          />
        )
      }
    >
      {loading ? (
        <p>Loading...</p>
      ) : selectedCard ? (
        <h1 className="text-4xl font-extrabold">${selectedCard?.amount}</h1>
      ) : (
        <p>No card selected</p>
      )}
    </DashboardCard>
  );
};
