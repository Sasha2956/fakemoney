import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { changeColor } from "@/lib/change-color";

interface Props {
  name: string;
  disabled?: boolean;
  color: string;
  selected?: boolean;
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
      className={cn(
        className,
        "w-72 h-36 rounded-md flex flex-col justify-between p-3 cursor-pointer",
        {
          "opacity-50 pointer-events-none cursor-not-allowed": disabled,
          "border-4 border-blue-500": selected,
        },
      )}
      style={{
        background: `linear-gradient(135deg,${color} 0%, ${changeColor(color, 30)} 100%)`,
        borderColor: changeColor(color, -30),
      }}
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
      <div className="size-full flex flex-col justify-end" onClick={() => onClickCard?.()}>
        <p className="text-white font-bold">{name}</p>
      </div>
    </div>
  );
};
