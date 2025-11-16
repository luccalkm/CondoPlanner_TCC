import { create } from 'zustand';
import { CondominiumApi, ETipoUsuario, type CondominiumDto, type CreateOrEditCondominiumInput, type UserCondominiumDto } from '../apiClient';
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
    createOrEditCondominium: (input: CreateOrEditCondominiumInput) => Promise<void>;
    isCondominiumAdmin: (condominiumId: number, userId: number) => boolean;
}

export const useCondominiumStore = create<CondominiumState>((set) => ({
    condominiums: [],
    userCondominiumRelations: [],
    condominiumRelations: [],
    loading: false,

    isCondominiumAdmin: (condominiumId: number, userId: number): boolean => {
        const relation = useCondominiumStore.getState().userCondominiumRelations.find(r => 
            r.condominiumId === condominiumId && r.userId === userId
        );
        return relation?.userType === ETipoUsuario.Administrador;
    },

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

    createOrEditCondominium: async (input: CreateOrEditCondominiumInput) => {
        try {
            const { id: currentUserId } = useAuthStore.getState().user || {};
            const mergedUserIds = Array.from(new Set([...(input.userIds ?? []), ...(currentUserId ? [currentUserId] : [])]));

            const finalInput: CreateOrEditCondominiumInput = {
                ...input,
                userIds: mergedUserIds,
                blocks: (input.blocks ?? [])?.map(b => ({
                    id: b.id ?? null,
                    name: b.name ?? '',
                    apartments: (b.apartments ?? [])?.map(a => ({
                        id: a.id ?? null,
                        number: a.number ?? '',
                        floorNumber: a.floorNumber ?? 0
                    }))
                }))
            };

            await condominiumApi.apiCondominiumCreateOrEditPost({ createOrEditCondominiumInput: finalInput });
        } catch (error) {
            console.error('Error creating or editing condominium:', error);
            throw error;
        }
    }
}));