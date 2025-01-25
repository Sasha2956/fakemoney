import { BalanceCard } from "@/components/dashboard/balance-card";
import { StoresIncomeCard } from "@/components/dashboard/stores-income-card";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Profile overview</h1>
      <div className="grid grid-cols-1 grid-rows-2 gap-4 w-full">
        <BalanceCard />
        <StoresIncomeCard />
      </div>
    </>
  )
}