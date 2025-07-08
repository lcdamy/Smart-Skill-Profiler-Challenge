import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ResultState = {
    summary: string;
    suggested_skills: string[];
    setResult: (data: { summary: string; suggested_skills: string[] }) => void;
    clearResult: () => void;
};

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

