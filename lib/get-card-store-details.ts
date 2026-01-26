import { CardStateItem } from "@/store/card";

interface ReturnProps {
  cards: CardStateItem[];
  selectedCard: any;
}

export const getCardStoreDetails = (
  cards: CardStateItem[],
): ReturnProps => {
  const items: CardStateItem[] = cards.length ? cards.map((card) => ({
    ...card,
    disabled: false,
    selected: card.user.selectedCardId === card.id,
  })) : [];

  const selectedCard = items.filter(
    (card) => card.user.selectedCardId === card.id,
  )[0];

  return {
    cards: items,
    selectedCard
  };
};
