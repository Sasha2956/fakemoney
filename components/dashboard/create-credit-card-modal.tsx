"use client";

import { useState } from "react";
import { DialogClose, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  onSubmit?: (name: string) => void;
}

export const CreateCreditCardModal = ({ onSubmit }: Props) => {
  const [cardName, setCardName] = useState("");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a card</DialogTitle>
      </DialogHeader>
      <Input
        placeholder="Card name"
        onChange={(e) => setCardName(e.target.value)}
      />
      <DialogClose asChild>
        <Button onClick={() => onSubmit?.(cardName)}>Create card</Button>
      </DialogClose>
    </>
  );
};
