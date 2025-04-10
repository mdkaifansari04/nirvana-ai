import { create } from 'zustand';

export type Gender = 'male' | 'female' | 'other' | '';

interface OnboardingState {
   email: string;
   age: string;
   weight: string;
   gender: Gender;
   name: string;
   healthSymptoms: string[];
   setEmail: (email: string) => void;
   setAge: (age: string) => void;
   setWeight: (weight: string) => void;
   setGender: (gender: Gender) => void;
   setName: (name: string) => void;
   setHealthSymptoms: (symptoms: string[]) => void;
   reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
   email: '',
   age: '',
   weight: '',
   gender: '',
   name: '',
   healthSymptoms: [],
   setEmail: (email) => set({ email }),
   setAge: (age) => set({ age }),
   setWeight: (weight) => set({ weight }),
   setGender: (gender) => set({ gender }),
   setName: (name) => set({ name }),
   setHealthSymptoms: (healthSymptoms) => set({ healthSymptoms }),
   reset: () =>
      set({
         email: '',
         age: '',
         weight: '',
         gender: '',
         name: '',
         healthSymptoms: [],
      }),
}));
