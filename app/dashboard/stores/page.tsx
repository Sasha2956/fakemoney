import { CreateStoreButton } from "@/components/dashboard/create-store-button";
import { StoresList } from "@/components/dashboard/stores-list";

export default function StoresPage() {
  return (
    <div className="min-h-screen space-y-5 mr-72">
      <h1 className="text-3xl font-bold">Your stores</h1>
      <CreateStoreButton />
      <StoresList />
    </div>
  );
}
