import { create } from 'zustand';
import type { CommonAreaDto } from '../apiClient';

interface CommonAreaViewState {
    currentArea: CommonAreaDto | null;
    setCurrentArea: (area: CommonAreaDto | null) => void;
    clearCurrentArea: () => void;
    handleWorkingTime: (openingTime: string, closingTime: string) => { open: boolean; text: string };
}

export const useCommonAreaViewStore = create<CommonAreaViewState>((set) => ({
    currentArea: null,
    setCurrentArea: (area) => set({ currentArea: area }),
    clearCurrentArea: () => set({ currentArea: null }),
    handleWorkingTime: (openingTime: string, closingTime: string) => {
        const toMinutes = (t?: string) => {
            if (!t) return null;
            const [h, m] = t.split(':').map(Number);
            if ([h, m].some(n => Number.isNaN(n))) return null;
            return (h || 0) * 60 + (m || 0);
        };

        const openMin = toMinutes(openingTime);
        const closeMin = toMinutes(closingTime);
        if (openMin == null || closeMin == null) return { open: false, text: 'Fechado agora' };

        const now = new Date();
        const nowMin = now.getHours() * 60 + now.getMinutes();

        const isOpen = openMin <= closeMin
            ? nowMin >= openMin && nowMin <= closeMin
            : nowMin >= openMin || nowMin <= closeMin;

        return { open: isOpen, text: isOpen ? 'Aberto agora' : 'Fechado agora' };
    }
}));

export default useCommonAreaViewStore;
