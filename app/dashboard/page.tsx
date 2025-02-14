import { BalanceCard } from "@/components/dashboard/balance-card";
import { OutcomesCard } from "@/components/dashboard/outcomes-card";
import { StoresIncomeCard } from "@/components/dashboard/stores-income-card";
import { requireUser } from "@/lib/require-user";

export default async function DashboardPage() {
  void await requireUser();

  return (
    <>
      <h1 className="text-3xl font-bold">Profile overview</h1>
      <div className="grid gap-2 min-[830px]:grid-cols-2">
        <BalanceCard />
        <StoresIncomeCard />
        <OutcomesCard />
      </div>
    </>
  )
}