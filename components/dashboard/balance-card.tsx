"use client";

import { useCardStore } from "@/store/card";
import { DashboardCard } from "./dashboard-card";
import { useEffect } from "react";

export const BalanceCard = () => {
  const selectedCard = useCardStore((state) => state.selectedCard);
  const fetchCards = useCardStore((state) => state.fetchCards);
  const loading = useCardStore((state) => state.loading);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    console.log(selectedCard);
    
  }, [selectedCard])

  return (
    <DashboardCard title="Balance" description="Balance from selected card:">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h1 className="text-4xl font-extrabold">${selectedCard?.amount}</h1>
      )}
    </DashboardCard>
  );
};
