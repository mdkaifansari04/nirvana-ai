import type { GeneratedExercisesQuestion } from '@/data-access/response';
import { create } from 'zustand';

interface MicroExerciseState {
   generatedQuestion: GeneratedExercisesQuestion | null;
   setGeneratedQuestion: (question: GeneratedExercisesQuestion) => void;
}

const useMicroExerciseStore = create<MicroExerciseState>((set) => ({
   generatedQuestion: null,
   setGeneratedQuestion: (question) => set({ generatedQuestion: question }),
}));

export default useMicroExerciseStore;
