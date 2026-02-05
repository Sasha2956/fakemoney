import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CreateStoreForm } from "./create-store-form";

export const CreateStoreButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex">
          <Button>
            <PlusIcon />
            Add store
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create store</DialogTitle>
        <CreateStoreForm />
      </DialogContent>
    </Dialog>
  );
};
