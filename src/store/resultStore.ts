import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ResultState = {
    summary: string;
    suggested_skills: string[];
    setResult: (data: { summary: string; suggested_skills: string[] }) => void;
    clearResult: () => void;
};

/**
 * Zustand store hook for managing and persisting result state.
 *
 * @remarks
 * This store uses Zustand with the `persist` middleware to save the result state
 * (including summary and suggested skills) to local storage under the key 'result-storage'.
 *
 * @example
 * const { summary, suggested_skills, setResult, clearResult } = useResultStore();
 *
 * @returns Zustand store hook for result state management.
 *
 * @property {string} summary - The summary of the result.
 * @property {Array<any>} suggested_skills - The list of suggested skills.
 * @method setResult - Updates the result state with the provided data.
 * @method clearResult - Resets the result state to its initial values.
 */
export const useResultStore = create<ResultState>()(
    persist(
        (set) => ({
            summary: '',
            suggested_skills: [],
            setResult: (data) => set(data),
            clearResult: () => set({ summary: '', suggested_skills: [] }),
        }),
        {
            name: 'result-storage', // unique name for the storage
        }
    )
);

