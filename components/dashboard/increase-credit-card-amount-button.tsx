import { PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { IncreaseCreditCardAmountModal } from "./increase-credit-card-amount-modal";

interface Props {
  onSubmit?: (amount: number) => void;
  className?: string;
}

export const IncreaseCreditCardAmountButton = ({ onSubmit, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={className}
          variant="ghost"
        >
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-6">
        <IncreaseCreditCardAmountModal onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
