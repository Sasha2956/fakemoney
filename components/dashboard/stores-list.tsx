"use client";

import { useStore } from "@/hooks/use-store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const StoresList = () => {
  const { stores, deleteStore, loading } = useStore();
  dayjs.extend(relativeTime);

  return (
    <div className="space-y-3">
      {loading ? (
        <Loader2Icon size={64} className="animate-spin" />
      ) : (
        stores.map((store) => (
          <div
            key={store.id}
            className={cn("flex justify-between", {
              "opacity-50 pointer-events-none cursor-not-allowed":
                store.disabled,
            })}
          >
            <Link href={`stores/${store.id}`}>
              <p className="font-bold">{store.name}</p>
              <p className="text-muted-foreground">
                created {dayjs(store.createdAt).fromNow()}
              </p>
            </Link>
            <Button variant="ghost" onClick={() => deleteStore(store.id)}>
              <Trash2Icon className="text-destructive" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
};
