import { create } from 'zustand';

export type Gender = 'male' | 'female' | 'other' | '';

interface OnboardingState {
   age: string;
   weight: string;
   gender: Gender;
   healthSymptoms: string[];
   setAge: (age: string) => void;
   setWeight: (weight: string) => void;
   setGender: (gender: Gender) => void;
   setHealthSymptoms: (symptoms: string[]) => void;
   reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
   age: '',
   weight: '',
   gender: '',
   healthSymptoms: [],
   setAge: (age) => set({ age }),
   setWeight: (weight) => set({ weight }),
   setGender: (gender) => set({ gender }),
   setHealthSymptoms: (healthSymptoms) => set({ healthSymptoms }),
   reset: () =>
      set({
         age: '',
         weight: '',
         gender: '',
         healthSymptoms: [],
      }),
}));
