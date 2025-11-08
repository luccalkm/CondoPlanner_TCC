import { create } from 'zustand';
import { CondominiumApi, type CondominioDto, type CreateOrEditCondominiumInput } from '../apiClient';
import { ApiConfiguration } from '../apiClient/apiConfig';
import { useAuthStore } from './auth.store';

const condominiumApi = new CondominiumApi(ApiConfiguration);

interface CondominiumState {
    condominiums: CondominioDto[];
    loading: boolean;
    fetchCondominiums: (userId?: number) => Promise<void>;
    createOrEditCondominium: (condominiumDto: CondominioDto) => Promise<void>;
}

export const useCondominiumStore = create<CondominiumState>((set) => ({
    condominiums: [],
    loading: false,

    fetchCondominiums: async (userId?: number) => {
        set({ loading: true });
        try {
            const condominiums = await condominiumApi.apiCondominiumGetAllUserIdGet({
                userId: userId || 0,
             });
            set({ condominiums: condominiums });
        } finally {
            set({ loading: false });
        }
    },

    createOrEditCondominium: async (condominiumDto: CondominioDto) => {
        try {
            const { id: currentUserId } = useAuthStore.getState().user || {};
            const userIds = [
                ...(condominiumDto.usuarios?.map(user => user.id).filter((id): id is number => id !== undefined) || []),
            ];

            if (currentUserId && !userIds.includes(currentUserId)) {
                userIds.push(currentUserId);
            }

            const input: CreateOrEditCondominiumInput = {
                ...condominiumDto,
                usuariosIds: userIds,
            };

            await condominiumApi.apiCondominiumCreateOrEditPost({ createOrEditCondominiumInput: input });
        } catch (error) {
            console.error("Error creating or editing condominium:", error);
            throw error;
        }
    }
}));