import { auth } from "@/auth";
import { ApiKeyCard } from "@/components/dashboard/api-key-card";
import { CallbacksForm } from "@/components/dashboard/callbacks-form";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function StorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const store = await prisma.store.findFirst({
    where: {
      id,
      userId: session?.user.id,
    },
  });

  if (!store) notFound();

  return (
    <>
      <h1 className="font-bold text-3xl mb-5">{store.name}</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="callbacks">Callbacks</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex gap-3">
          <ApiKeyCard apiKey={store.apiKey} className="flex-1 py-5" />
          <DashboardCard
            title="Total revenue"
            className="flex-1 py-5"
            description="Total revenue which you can widthraw on any of your cards"
          >
            <h1 className="text-4xl font-extrabold">
              ${Number(store.revenue)}
            </h1>
          </DashboardCard>
        </TabsContent>
        <TabsContent value="callbacks">
          <CallbacksForm store={{ ...store, revenue: Number(store.revenue) }} />
        </TabsContent>
      </Tabs>
    </>
  );
}
