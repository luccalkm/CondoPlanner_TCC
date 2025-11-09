import { create } from 'zustand';
import type { CondominioDto } from '../apiClient';
import { useCondominiumStore } from './condominium.store';

interface InstanceState {
    selectedCondominiumId: number | null;
    selectedCondominium: CondominioDto | null;
    loadingSelected: boolean;
    selectCondominium: (id: number) => void;
    clearSelection: () => void;
    syncFromParam: (id: number) => void;
}

export const useInstanceStore = create<InstanceState>((set, get) => ({
    selectedCondominiumId: null,
    selectedCondominium: null,
    loadingSelected: false,

    selectCondominium: (id: number) => {
        const { condominiums } = useCondominiumStore.getState();
        const found = condominiums.find(c => c.id === id) || null;
        set({ selectedCondominiumId: id, selectedCondominium: found });
    },

    clearSelection: () => set({ selectedCondominiumId: null, selectedCondominium: null }),

    syncFromParam: (id: number) => {
        const currentId = get().selectedCondominiumId;
        if (currentId !== id) {
            get().selectCondominium(id);
        }
    }
}));
