import { CardWithRelations } from "@/@types/prisma";
import { getCardStoreDetails } from "@/lib/get-card-store-details";
import { Api } from "@/services/api-client";
import { UpdateCard } from "@/services/dto/card.dto";
import { create } from "zustand";

export interface CardStateItem extends CardWithRelations {
  disabled?: boolean;
  selected?: boolean;
}

export interface CardState {
  cards: CardStateItem[];
  loading: boolean;
  error?: boolean;
  selectedCard?: CardWithRelations;

  fetchCards: () => Promise<void>;
  addCard: (name: string) => Promise<void>;
  increaseCardAmountOrSetSelectedCard: (params: UpdateCard) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  loading: false,
  erorr: false,
  fetchCards: async () => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.card.getCards();
      set(getCardStoreDetails(data));
    } catch (err) {
      set({
        error: true,
      });
      console.error(err);
    } finally {
      set({
        loading: false,
      });
    }
  },
  addCard: async (name: string) => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.card.createCard({ name });
      set(getCardStoreDetails(data));
    } catch (err) {
      set({
        error: true,
      });
      console.error(err);
    } finally {
      set({
        loading: false,
      });
    }
  },
  increaseCardAmountOrSetSelectedCard: async (params: UpdateCard) => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.card.increaseCardAmountOrSetSelectedCard(params);
      set(getCardStoreDetails(data));
    } catch (err) {
      set({
        error: true,
      });
      console.error(err);
    } finally {
      set({
        loading: false,
      });
    }
  },
  deleteCard: async (id: string) => {
    try {
      set({
        error: false,
        cards: get().cards.map((card) => ({
          ...card,
          disabled: card.id === id,
        })),
      });
      const data = await Api.card.deleteCard(id);
      set(getCardStoreDetails(data));
    } catch (err) {
      set({
        error: true,
      });
      console.error(err);
    } finally {
      set({
        cards: get().cards.map((card) => ({
          ...card,
          disabled: card.id === id,
        })),
      });
    }
  },
}));
