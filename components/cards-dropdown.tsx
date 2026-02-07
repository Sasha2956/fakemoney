"use client";

import { useCardStore } from "@/store/card";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CardWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";

interface Props {
  className?: string;
  contentClassName?: string;
  onChange?: (cardId: string) => void;
}

export const CardsDropdown = ({
  className,
  contentClassName,
  onChange,
}: Props) => {
  const cards = useCardStore((state) => state.cards);
  const loading = useCardStore((state) => state.loading);
  const selectedCard = useCardStore((state) => state.selectedCard);
  const fetchCards = useCardStore((state) => state.fetchCards);
  const [selected, setSelected] = useState<CardWithRelations>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCards();
    setSelected(selectedCard || cards[0]);
  }, []);

  const onClickCard = (card: CardWithRelations) => {
    setSelected(card);
    setOpen(false);
    onChange?.(card.id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {selected ? (
          loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <button className={cn("flex justify-between p-2", className)}>
              <div className="flex gap-2">
                <div
                  className="w-10 h-6 rounded-sm"
                  style={{ backgroundColor: selected.color }}
                />
                <p className="font-bold">{selected?.name}</p>
              </div>
              <ChevronDownIcon />
            </button>
          )
        ) : (
          <p>No cards</p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("space-y-3 p-2", contentClassName)}
        align="start"
      >
        {cards
          .filter((card) => card.id !== selected?.id)
          .map((card) => (
            <button
              onClick={() => onClickCard(card)}
              key={card.id}
              className="flex w-80 flex-1 gap-2"
            >
              <div
                className="w-10 h-6 rounded-sm"
                style={{ backgroundColor: card.color }}
              />
              <p className="font-bold">{card.name}</p>
            </button>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
