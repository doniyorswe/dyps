import React from "react";
import Modal from "./modal";
import { Button } from "../ui/button";
import useModal from "@/hooks/use-modal";
import { useApi } from "@/hooks/use-api";

type Props = {
  modalKey?: string;
  name?: string;
  path: string;
  id?: number;
};

export default function DeleteModal({ modalKey = "delete", path, id }: Props) {
  const state = useModal(modalKey);
  const { mutate, isPending } = useApi(path).destroy;

  function handleDelete() {
    mutate(id!, {
      onSuccess: state.close,
    });
  }

  return (
    <Modal modalKey={modalKey}>
      <h1 className="text-center">Are you sure you want to delete it?</h1>
      <div className="flex items-center justify-center gap-3">
        <Button
          data-slot="dialog-close"
          variant="secondary"
          onClick={state.close}
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} loading={isPending}>
          Yes, I'm sure!
        </Button>
      </div>
    </Modal>
  );
}
