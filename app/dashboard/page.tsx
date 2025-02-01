import { BalanceCard } from "@/components/dashboard/balance-card";
import { StoresIncomeCard } from "@/components/dashboard/stores-income-card";
import { requireUser } from "@/lib/require-user";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <>
      <h1 className="text-3xl font-bold">Profile overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        <BalanceCard />
        <StoresIncomeCard />
        <BalanceCard />
        <StoresIncomeCard />
      </div>
    </>
  )
}