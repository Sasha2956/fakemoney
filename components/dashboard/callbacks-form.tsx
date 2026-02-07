"use client";

import { Store } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/hooks/use-store";

interface Props {
  store: Store;
}

export const CallbacksForm = ({ store }: Props) => {
  const [callbackUrl, setCallbackUrl] = useState(store.callbackUrl || "");
  const [loading, setLoading] = useState(false);
  const { updateStore } = useStore();

  const onClickSave = async () => {
    try {
      setLoading(true);
      console.log(callbackUrl);
      
      updateStore(
        {
          callbackUrl
        },
        store.id,
      );
      toast.success("Successfully saved.")
    } catch (err) {
      console.error(err);
      toast.error("Failed to update store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="font-bold text-3xl">Callbacks</h1>
        <p className="text-muted-foreground">
          A POST request is sent to this endpoint whenever a specific event
          happens.
        </p>
        <div>
          <Label>Callback URL</Label>
          <Input
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
            placeholder="Ex: https://example.com/api/example/callback"
            className="w-96"
          />
        </div>
      </div>
      <Button className="w-96" onClick={onClickSave} isLoading={loading}>
        Save changes
      </Button>
    </div>
  );
};
