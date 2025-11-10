import { create } from 'zustand';
import { CondominiumApi, type CondominiumDto, type CreateOrEditCondominiumInput, type UserCondominiumDto } from '../apiClient';
import { ApiConfiguration } from '../apiClient/apiConfig';
import { useAuthStore } from './auth.store';

const condominiumApi = new CondominiumApi(ApiConfiguration);

interface CondominiumState {
    condominiums: CondominiumDto[];
    userCondominiumRelations: UserCondominiumDto[];
    condominiumRelations: UserCondominiumDto[];
    loading: boolean;
    fetchCondominiums: (userId?: number) => Promise<void>;
    fetchCondominiumRelations: (condominiumId: number) => Promise<void>;
    createOrEditCondominium: (condominiumDto: CondominiumDto) => Promise<void>;
}

export const useCondominiumStore = create<CondominiumState>((set) => ({
    condominiums: [],
    userCondominiumRelations: [],
    condominiumRelations: [],
    loading: false,

    fetchCondominiums: async (userId?: number) => {
        set({ loading: true });
        try {
            const effectiveUserId = userId ?? useAuthStore.getState().user?.id;
            if (!effectiveUserId) {
                set({ userCondominiumRelations: [], condominiums: [] });
                return;
            }
            const relations = await condominiumApi.apiCondominiumGetAllUserIdGet({ userId: effectiveUserId });
            const condos = relations
                .map(r => r.condominium)
                .filter((c): c is CondominiumDto => !!c);
            set({ userCondominiumRelations: relations, condominiums: condos });
        } finally {
            set({ loading: false });
        }
    },

    fetchCondominiumRelations: async (condominiumId: number) => {
        if (!condominiumId) {
            set({ condominiumRelations: [] });
            return;
        }
        try {
            const relations = await condominiumApi.apiCondominiumCondominioIdRelationsGet({ condominioId: condominiumId });
            set({ condominiumRelations: relations });
        } catch (e) {
            console.error('Erro ao buscar relações completas do condomínio', e);
            set({ condominiumRelations: [] });
        }
    },

    createOrEditCondominium: async (condominiumDto: CondominiumDto) => {
        try {
            const { id: currentUserId } = useAuthStore.getState().user || {};
            const userIds: number[] = [];
            if (currentUserId) userIds.push(currentUserId);

            const input: CreateOrEditCondominiumInput = {
                id: condominiumDto.id ?? null,
                name: condominiumDto.name ?? null,
                cnpj: condominiumDto.cnpj ?? null,
                email: condominiumDto.email ?? null,
                address: condominiumDto.address,
                userIds
            };

            await condominiumApi.apiCondominiumCreateOrEditPost({ createOrEditCondominiumInput: input });
        } catch (error) {
            console.error('Error creating or editing condominium:', error);
            throw error;
        }
    }
}));