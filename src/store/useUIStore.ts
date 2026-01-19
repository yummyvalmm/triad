import { create } from 'zustand';

interface UIState {
    loading: boolean;
    heroImageLoaded: boolean;
    footerHeight: number;
    selectedPlan: string | null;
    setLoading: (loading: boolean) => void;
    setHeroImageLoaded: (loaded: boolean) => void;
    setFooterHeight: (height: number) => void;
    setSelectedPlan: (planId: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    loading: true,
    heroImageLoaded: false,
    footerHeight: 0,
    selectedPlan: null,
    setLoading: (loading) => set({ loading }),
    setHeroImageLoaded: (heroImageLoaded) => set({ heroImageLoaded }),
    setFooterHeight: (footerHeight) => set({ footerHeight }),
    setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
}));
