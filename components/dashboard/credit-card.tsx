import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

interface Props {
  name: string;
  disabled?: boolean;
  color: string;
  selected?: boolean
  onClickCard?: () => void;
  onClickDeleteCard?: () => void;
  className?: string;
}

export const CreditCard = ({
  name,
  disabled = false,
  color,
  onClickCard,
  onClickDeleteCard,
  selected,
  className,
}: Props) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={cn(
        className,
        "w-72 h-36 rounded-md flex flex-col justify-between p-3 cursor-pointer",
        {
          "opacity-50 pointer-events-none cursor-not-allowed": disabled,
          "border-4 border-blue-500": selected
        },
      )}
      onClick={() => onClickCard?.()}
    >
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-red-700"
              onClick={() => onClickDeleteCard?.()}
            >
              <Trash2Icon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-white font-bold">{name}</p>
    </div>
  );
};
