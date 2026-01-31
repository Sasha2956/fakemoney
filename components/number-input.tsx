"use client";

import { InputHTMLAttributes, useState } from "react";
import { Input } from "./ui/input";

export const NumberInput = ({
  value,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState(value || "0");
  return (
    <Input
      type="number"
      value={inputValue}
      onChange={(e) => {
        onChange?.(e);
        const regex = /^\d+$/;
        
        if (!regex.exec(e.target.value)) {
          return;
        } else {
          setInputValue(e.target.value);
        }
      }}
      {...props}
    />
  );
};
