"use client";

import { useState } from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { NumberInput } from "../number-input";

interface Props {
  onSubmit?: (amount: number) => void;
}

export const IncreaseCreditCardAmountModal = ({ onSubmit }: Props) => {
  const [amount, setAmount] = useState("");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add card balance</DialogTitle>
      </DialogHeader>
      <NumberInput
        placeholder="Card amount"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={() => onSubmit?.(Number(amount))}>Submit</Button>
    </>
  );
};
