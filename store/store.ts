import { StoreWithRelations } from "@/@types/prisma";
import { createStoreSchema } from "@/schemas";
import { Api } from "@/services/api-client";
import { UpdateStoreValues } from "@/services/dto/store.dto";
import { z } from "zod";
import { create } from "zustand";

export interface StoreStateItem extends StoreWithRelations {
  disabled?: boolean;
}

export interface StoreState {
  stores: StoreStateItem[];
  loading: boolean;
  error: boolean;

  fetchStores: () => Promise<void>;
  addStore: (values: z.infer<typeof createStoreSchema>) => Promise<void>;
  updateStore: (params: UpdateStoreValues, id: string) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
}

export const useStoreStore = create<StoreState>((set, get) => ({
  stores: [],
  loading: false,
  error: false,
  fetchStores: async () => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.store.getStores();
      set({ stores: data });
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
  addStore: async (values: z.infer<typeof createStoreSchema>) => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.store.createStore(values);
      set({ stores: data });
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
  updateStore: async (params: UpdateStoreValues, id: string) => {
    try {
      set({
        loading: true,
        error: false,
      });
      const data = await Api.store.updateStore(params, id);
      set({ stores: data });
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
  deleteStore: async (id: string) => {
    try {
      set({
        error: false,
        stores: get().stores.map((store) => ({
          ...store,
          disabled: store.id === id,
        })),
      });
      const data = await Api.store.deleteStore(id);
      set({ stores: data });
    } catch (err) {
      set({
        error: true,
      });
      console.error(err);
    }
  },
}));
