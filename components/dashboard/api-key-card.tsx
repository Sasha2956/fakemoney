"use client";

import { CheckIcon, ClipboardIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DashboardCard } from "./dashboard-card";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  apiKey: string;
}

export const ApiKeyCard = ({ className, apiKey }: Props) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const onClickCopyButton = async () => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toast.success("Copied successfully");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        toast.error("Copy failed. Try again");
      }
    }
  };

  return (
    <DashboardCard
      title="Store API key"
      description="API key of your store to interact with it with REST API"
      className={className}
    >
      <div className="flex gap-3">
        <p className="p-2 rounded-sm bg-muted font-mono">
          {showApiKey ? apiKey : "*********************"}
        </p>
        <Button variant="ghost" onClick={() => setShowApiKey(!showApiKey)}>
          {showApiKey ? <EyeClosedIcon /> : <EyeIcon />}
        </Button>
        {showApiKey && (
          <Button variant="ghost" onClick={() => onClickCopyButton()}>
            {copied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        )}
      </div>
    </DashboardCard>
  );
};
