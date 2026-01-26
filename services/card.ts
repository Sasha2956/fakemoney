import { axoisInstance } from "./instance";
import { CreateCard, UpdateCard } from "./dto/card.dto";
import { CardWithRelations } from "@/@types/prisma";

export const getCards = async (): Promise<CardWithRelations[]> => {
  return (await axoisInstance.get("/cards")).data;
};

export const createCard = async (
  params: CreateCard,
): Promise<CardWithRelations[]> => {
  return (await axoisInstance.post("/cards", params)).data;
};

export const increaseCardAmountOrSetSelectedCard = async (
  params: UpdateCard,
): Promise<CardWithRelations[]> => {
  return (await axoisInstance.patch(`/cards/${params.id}`, params)).data;
};

export const deleteCard = async (id: string): Promise<CardWithRelations[]> => {
  return (await axoisInstance.delete(`/cards/${id}`)).data;
};
