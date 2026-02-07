import { z } from "zod";
import { axoisInstance } from "./instance";
import { StoreWithRelations } from "@/@types/prisma";
import { createStoreSchema } from "@/schemas";
import { UpdateStoreValues } from "./dto/store.dto";

export const getStores = async (): Promise<StoreWithRelations[]> => {
  return (await axoisInstance.get("/stores")).data;
};

export const createStore = async (
  params: z.infer<typeof createStoreSchema>,
): Promise<StoreWithRelations[]> => {
  return (await axoisInstance.post("/stores", params)).data;
};

export const deleteStore = async (
  id: string,
): Promise<StoreWithRelations[]> => {
  return (await axoisInstance.delete(`/stores/${id}`)).data;
};

export const updateStore = async (
  params: UpdateStoreValues,
  id: string,
): Promise<StoreWithRelations[]> => {
  return (await axoisInstance.patch(`/stores/${id}`, params)).data;
};
