import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InviteState {
  pendingInviteToken: string | null;
  setPendingInviteToken: (token: string | null) => void;
  clearPendingInviteToken: () => void;
}

export const useInviteStore = create<InviteState>()(
  persist(
    (set) => ({
      pendingInviteToken: null,
      setPendingInviteToken: (token) => set({ pendingInviteToken: token }),
      clearPendingInviteToken: () => set({ pendingInviteToken: null }),
    }),
    { name: 'invite-storage' }
  )
);