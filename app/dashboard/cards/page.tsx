import { CardsList } from "@/components/dashboard/cards-list";

export default function CardsPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Your cards</h1>
      <CardsList />
    </div>
  );
}
