import { useModalStore } from "@/store/modal-store";

export default function useModal(modalKey = "default") {
  const { modals, openModal, closeModal } = useModalStore();
  return {
    isOpen: !!modals[modalKey],
    open: () => openModal(modalKey),
    close: () => closeModal(modalKey),
  };
}
