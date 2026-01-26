"use client";

import { useCardStore } from "@/store/card";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { CreditCard } from "./credit-card";
import { CreateCreditCardButton } from "./create-credit-card-button";

export const CardsList = () => {
  const cards = useCardStore((state) => state.cards);
  const loading = useCardStore((state) => state.loading);
  const error = useCardStore((state) => state.error);
  const fetchCards = useCardStore((state) => state.fetchCards);
  const increaseCardAmountOrSetSelectedCard = useCardStore(
    (state) => state.increaseCardAmountOrSetSelectedCard,
  );
  const deleteCard = useCardStore((state) => state.deleteCard);
  const addCard = useCardStore((state) => state.addCard);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return (
    <div className="grid grid-cols-5 gap-3 items-center">
      {loading ? (
        <Loader2Icon size={64} className="animate-spin" />
      ) : (
        <>
          {cards.map((card) => (
            <CreditCard
              onClickCard={() =>
                increaseCardAmountOrSetSelectedCard({ id: card.id })
              }
              onClickDeleteCard={() => deleteCard(card.id)}
              name={card.name}
              disabled={card.disabled}
              selected={card.selected}
              key={card.id}
              color={card.color}
            />
          ))}
          <CreateCreditCardButton onSubmit={addCard} />
        </>
      )}
    </div>
  );
};
