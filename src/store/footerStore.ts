import { create } from 'zustand';

type FooterLocation = 'result-test' | 'take-test' | null;

interface FooterStore {
    location: FooterLocation;
    setLocation: (location: FooterLocation) => void;
}

/**
 * Zustand store for managing the footer's location state.
 *
 * @remarks
 * This store provides a `location` state and a `setLocation` action to update it.
 *
 * @example
 * ```typescript
 * const { location, setLocation } = useFooterStore();
 * setLocation('result-test');
 * ```
 *
 * @property location - The current location value in the footer, or `null` if not set.
 * @property setLocation - Function to update the `location` state.
 */
export const useFooterStore = create<FooterStore>((set) => ({
    location: null,
    setLocation: (location) => set({ location }),
}));