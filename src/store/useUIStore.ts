import { create } from 'zustand';

interface UIState {
    loading: boolean;
    footerHeight: number;
    selectedPlan: string | null;
    setLoading: (loading: boolean) => void;
    setFooterHeight: (height: number) => void;
    setSelectedPlan: (planId: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    loading: true,
    footerHeight: 0,
    selectedPlan: null,
    setLoading: (loading) => set({ loading }),
    setFooterHeight: (footerHeight) => set({ footerHeight }),
    setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
}));
