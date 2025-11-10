import { create } from 'zustand';
import { ETipoUsuario, type CondominiumDto } from '../apiClient';
import { useCondominiumStore } from './condominium.store';
import { useAuthStore } from './auth.store';

interface InstanceState {
    selectedCondominiumId: number | null;
    selectedCondominium: CondominiumDto | null;
    loadingSelected: boolean;
    selectCondominium: (id: number) => void;
    clearSelection: () => void;
    isAdminSelected: () => boolean;
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

    isAdminSelected: () => {
        const user = useAuthStore.getState().user;
        return get().selectedCondominiumId !== null && useCondominiumStore.getState().userCondominiumRelations.some(r =>
            r.condominiumId === get().selectedCondominium?.id &&
            r.userId === user?.id &&
            r.userType === ETipoUsuario.Administrador
        );
    },

    syncFromParam: (id: number) => {
        const currentId = get().selectedCondominiumId;
        if (currentId !== id) {
            get().selectCondominium(id);
        }
    }
}));
