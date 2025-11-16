import { create } from 'zustand';
import { ApiConfiguration } from '../apiClient/apiConfig';
import { ReservationApi } from '../apiClient';
import type { ReservationDto, CreateReservationInput } from '../apiClient';

const api = new ReservationApi(ApiConfiguration);

type MonthKey = `${number}-${number}-${number}`;

interface ReservationState {
  loading: boolean;
  error: string | null;
  byMonth: Record<MonthKey, ReservationDto[]>;
  fetchForAreaMonth: (areaId: number, year: number, monthIndex0: number) => Promise<void>;
  create: (input: CreateReservationInput) => Promise<void>;
  cancel: (reservationId: number) => Promise<void>;
  approve: (reservationId: number, approve: boolean) => Promise<void>;
}

function key(areaId: number, year: number, monthIndex0: number): MonthKey {
  return `${areaId}-${year}-${monthIndex0}` as MonthKey;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
  loading: false,
  error: null,
  byMonth: {},
  fetchForAreaMonth: async (areaId, year, monthIndex0) => {
    if (!areaId) return;
    const k = key(areaId, year, monthIndex0);
    set({ loading: true, error: null });
    try {
      const start = new Date(year, monthIndex0, 1);
      const end = new Date(year, monthIndex0 + 1, 0, 23, 59, 59, 999);
      const list = await api.apiReservationAreaAreaIdGet({ areaId, start, end });
      set(state => ({ byMonth: { ...state.byMonth, [k]: list } }));
    } catch (e: unknown) {
      set({ error: (e as Error)?.message ?? 'Falha ao carregar reservas.' });
    } finally {
      set({ loading: false });
    }
  },
  create: async (input) => {
    await api.apiReservationPost({ createReservationInput: input });
    if (input.areaId && input.startDate) {
      const d = new Date(input.startDate);
      await get().fetchForAreaMonth(input.areaId, d.getFullYear(), d.getMonth());
    }
  },
  cancel: async (reservationId) => {
    await api.apiReservationReservationIdCancelPost({ reservationId });
  },
  approve: async (reservationId, approve) => {
    await api.apiReservationReservationIdApprovePost({ reservationId, approveRequest: { approve } });
  },
}));

export default useReservationStore;
