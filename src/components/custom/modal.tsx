import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  modalKey: string;
  className?: ClassNameValue;
  title?: string;
  children?: ReactNode;
};

export default function Modal({ modalKey, className, title, children }: Props) {
  const { isOpen, close } = useModal(modalKey);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          {!!title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <VisuallyHidden>
              <DialogTitle>Modal</DialogTitle>
            </VisuallyHidden>
          )}
          <VisuallyHidden>
            <DialogDescription>Modal content</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
