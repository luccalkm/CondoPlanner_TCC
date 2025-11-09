import { create } from 'zustand';
import { CondominiumApi, type CondominioDto, type CreateOrEditCondominiumInput, type UsuarioCondominioDto } from '../apiClient';
import { ApiConfiguration } from '../apiClient/apiConfig';
import { useAuthStore } from './auth.store';

const condominiumApi = new CondominiumApi(ApiConfiguration);

interface CondominiumState {
    condominiums: CondominioDto[];
    userCondominiumRelations: UsuarioCondominioDto[];
    loading: boolean;
    fetchCondominiums: (userId?: number) => Promise<void>;
    createOrEditCondominium: (condominiumDto: CondominioDto) => Promise<void>;
}

export const useCondominiumStore = create<CondominiumState>((set) => ({
    condominiums: [],
    userCondominiumRelations: [],
    loading: false,

    fetchCondominiums: async (userId?: number) => {
        set({ loading: true });
        try {
            const effectiveUserId = userId ?? useAuthStore.getState().user?.id;
            if (!effectiveUserId) {
                set({ userCondominiumRelations: [], condominiums: [] });
                return;
            }

            const relations = await condominiumApi.apiCondominiumGetAllUserIdGet({
                userId: effectiveUserId,
            });

            const condos = relations
                .map((r) => r.condominio)
                .filter((c): c is CondominioDto => !!c);

            set({
                userCondominiumRelations: relations,
                condominiums: condos,
            });
        } finally {
            set({ loading: false });
        }
    },

    createOrEditCondominium: async (condominiumDto: CondominioDto) => {
        try {
            const { id: currentUserId } = useAuthStore.getState().user || {};
            const userIds: number[] = [];

            if (currentUserId) {
                userIds.push(currentUserId);
            }

            const input: CreateOrEditCondominiumInput = {
                id: condominiumDto.id ?? null,
                nome: condominiumDto.nome ?? null,
                cnpj: condominiumDto.cnpj ?? null,
                email: condominiumDto.email ?? null,
                endereco: condominiumDto.endereco,
                usuariosIds: userIds,
            };

            await condominiumApi.apiCondominiumCreateOrEditPost({
                createOrEditCondominiumInput: input,
            });
        } catch (error) {
            console.error("Error creating or editing condominium:", error);
            throw error;
        }
    }
}));