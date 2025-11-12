import { create } from 'zustand';
import type { CommonAreaDto } from '../apiClient';

interface CommonAreaViewState {
  currentArea: CommonAreaDto | null;
  setCurrentArea: (area: CommonAreaDto | null) => void;
  clearCurrentArea: () => void;
}

export const useCommonAreaViewStore = create<CommonAreaViewState>((set) => ({
  currentArea: null,
  setCurrentArea: (area) => set({ currentArea: area }),
  clearCurrentArea: () => set({ currentArea: null }),
}));

export default useCommonAreaViewStore;
