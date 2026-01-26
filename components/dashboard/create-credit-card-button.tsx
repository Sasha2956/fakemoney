import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateCreditCardModal } from "./create-credit-card-modal";

interface Props {
  onSubmit?: (name: string) => void;
  className?: string;
}

export const CreateCreditCardButton = ({ onSubmit, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            className,
            "w-72 h-36 rounded-md flex flex-col gap-2 justify-center items-center p-3 border-dashed border-red-600 hover:bg-black/30 transition-colors duration-300",
          )}
        >
          <PlusCircleIcon />
          <p className="font-bold">Add card</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <CreateCreditCardModal onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
