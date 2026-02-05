import { useStoreStore, type StoreState } from "@/store/store";
import { useEffect } from "react";

export const useStore = (): StoreState => {
  const state = useStoreStore((state) => state);

  useEffect(() => {
    state.fetchStores();
  }, []);

  return { ...state };
};
