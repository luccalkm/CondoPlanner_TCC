import { create } from 'zustand';

interface AlertState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  showAlert: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set: (partial: Partial<AlertState>) => void) => ({
  message: '',
  type: 'info',
  visible: false,
  showAlert: (message: string, type: 'success' | 'error' | 'info' | 'warning') => set({ message, type, visible: true }),
  hideAlert: () => set({ visible: false }),
}));