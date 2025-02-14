import { DashboardCard } from "./dashboard-card";

export const BalanceCard = () => {
  return (
    <DashboardCard title="Balance" description="Balance from selected card:">
      <h1 className="text-4xl font-extrabold">${2500}</h1>
    </DashboardCard>
  );
};
