import { create } from "zustand";

interface ModalState {
    modals: Record<string, boolean | undefined>;
    openModal: (modalKey: string) => void;
    closeModal: (modalKey: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    modals: {},
    openModal: (key) =>
        set((state) => ({ modals: { ...state.modals, [key]: true } })),
    closeModal: (key) =>
        set((state) => {
            const newModals = { ...state.modals };
            delete newModals[key];
            return { modals: newModals };
        }),
}));
