import { BalanceCard } from "@/components/dashboard/balance-card";
import { OutcomesCard } from "@/components/dashboard/outcomes-card";
import { StoresIncomeCard } from "@/components/dashboard/stores-income-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-3xl font-bold mb-2">Profile overview</h1>
      <div className="grid gap-2 min-h-[830px] grid-cols-2">
        <BalanceCard />
        <StoresIncomeCard />
        <OutcomesCard />
      </div>
    </div>
  );
}
