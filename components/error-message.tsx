import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";

interface Props {
  className?: string;
  message: string;
}

export const ErrorMessage = ({ className, message }: Props) => {
  return (
    <div className={cn("bg-red-700/15 text-destructive flex justify-center p-4 rounded-md gap-2 border border-destructive", className)}>
      <TriangleAlertIcon />
      <p>{message}</p>
    </div>
  );
};
