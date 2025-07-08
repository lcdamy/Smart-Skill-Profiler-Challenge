import { create } from 'zustand';

type FooterLocation = 'result-test' | 'take-test' | null;

interface FooterStore {
    location: FooterLocation;
    setLocation: (location: FooterLocation) => void;
}

export const useFooterStore = create<FooterStore>((set) => ({
    location: null,
    setLocation: (location) => set({ location }),
}));