"use client";

import { CoreExercise } from "@/components/exercise/core-exercise";
import { ExerciseReport } from "@/components/exercise/exercise-report";
import { MicroExercise } from "@/components/exercise/micro-exercise";
import { SessionSetup } from "@/components/exercise/session-setup";
import { ExerciseService } from "@/services/exercise.service";
import useMicroExerciseStore from "@/store/micro-exercise";
import type { AIReport, ExerciseContent, MicroExercise as MicroExerciseType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

enum ExerciseStage {
  SETUP = 0,
  CORE_EXERCISE = 1,
  MICRO_EXERCISE = 2,
  REPORT = 3,
}

export default function NewExercisePage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<ExerciseStage>(ExerciseStage.SETUP);
  const [isLoading, setIsLoading] = useState(false);

  const [sessionGoal, setSessionGoal] = useState("");
  const [moodRating, setMoodRating] = useState(5);
  const [primaryEmotion, setPrimaryEmotion] = useState("");
  const [exerciseContent, setExerciseContent] = useState<ExerciseContent | null>(null);
  const [qnaAnswers, setQnaAnswers] = useState<{ [index: number]: string }>({});
  const [mcqAnswers, setMcqAnswers] = useState<{ [index: number]: string[] }>({});
  const [moodRatingAfter, setMoodRatingAfter] = useState(5);
  const [reflection, setReflection] = useState("");
  const [report, setReport] = useState<AIReport | null>(null);
  const { generatedQuestion } = useMicroExerciseStore();

  const handleSessionSetup = async (data: { sessionGoal: string; moodRating: number; primaryEmotion: string }) => {
    setSessionGoal(data.sessionGoal);
    setMoodRating(data.moodRating);
    setPrimaryEmotion(data.primaryEmotion);

    setCurrentStage(ExerciseStage.CORE_EXERCISE);
  };

  const handleStartExercise = () => {
    setCurrentStage(ExerciseStage.MICRO_EXERCISE);
  };

  const handleMicroExerciseComplete = async (data: { qnaAnswers: { [index: number]: string }; mcqAnswers: { [index: number]: string[] }; moodRatingAfter: number; reflection: string }) => {
    setQnaAnswers(data.qnaAnswers);
    setMcqAnswers(data.mcqAnswers);
    setMoodRatingAfter(data.moodRatingAfter);
    setReflection(data.reflection);

    if (!exerciseContent) return;

    setIsLoading(true);
    try {
      const filledExercise: Partial<MicroExerciseType> = {
        session_goal: sessionGoal,
        quick_check_in: {
          mood_rating: moodRating,
          primary_emotion: primaryEmotion,
        },
        exercise_content: {
          qna: exerciseContent.qna.map((q, i) => ({
            ...q,
            answer: data.qnaAnswers[i] || "",
          })),
          mcq: exerciseContent.mcq.map((m, i) => ({
            ...m,
            answers: data.mcqAnswers[i] || [],
          })),
        },
        user_reflection: {
          mood_rating_after: data.moodRatingAfter,
          reflection: data.reflection,
        },
      };

      const generatedReport = await ExerciseService.generateReport(filledExercise);
      setReport(generatedReport);
      setCurrentStage(ExerciseStage.REPORT);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseComplete = async () => {
    if (!exerciseContent || !report) return;

    setIsLoading(true);
    try {
      const completeExercise: Partial<MicroExerciseType> = {
        session_goal: sessionGoal,
        quick_check_in: {
          mood_rating: moodRating,
          primary_emotion: primaryEmotion,
        },
        exercise_content: {
          qna: exerciseContent.qna.map((q, i) => ({
            ...q,
            answer: qnaAnswers[i] || "",
          })),
          mcq: exerciseContent.mcq.map((m, i) => ({
            ...m,
            answers: mcqAnswers[i] || [],
          })),
        },
        user_reflection: {
          mood_rating_after: moodRatingAfter,
          reflection,
        },
        ai_generated_report: report,
      };

      await ExerciseService.saveExerciseWithReport(completeExercise);

      router.push("/dashboard/exercise");
    } catch (error) {
      console.error("Error saving exercise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStage = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg border min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground">
            {currentStage === ExerciseStage.SETUP && "Generating exercise..."}
            {currentStage === ExerciseStage.MICRO_EXERCISE && "Generating report..."}
            {currentStage === ExerciseStage.REPORT && "Saving exercise..."}
          </p>
        </div>
      );
    }

    switch (currentStage) {
      case ExerciseStage.SETUP:
        return <SessionSetup onComplete={handleSessionSetup} />;

      case ExerciseStage.CORE_EXERCISE:
        return generatedQuestion ? <CoreExercise exerciseContent={generatedQuestion} sessionGoal={sessionGoal} onStartExercise={handleStartExercise} /> : null;

      case ExerciseStage.MICRO_EXERCISE:
        return generatedQuestion ? <MicroExercise exerciseContent={generatedQuestion} sessionGoal={sessionGoal} initialMoodRating={moodRating} initialEmotion={primaryEmotion} onComplete={handleMicroExerciseComplete} /> : null;

      case ExerciseStage.REPORT:
        return report ? <ExerciseReport report={report} initialMood={moodRating} finalMood={moodRatingAfter} onComplete={handleExerciseComplete} /> : null;

      default:
        return null;
    }
  };

  return (
    <div className="container max-w-3xl py-8 px-4 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mental Health Assessment</h1>

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Object.values(ExerciseStage)
              .filter((value) => typeof value === "number")
              .map((stage) => {
                const stageNumber = Number(stage);
                return <div key={`stage-${String(stage)}`} className={`w-3 h-3 rounded-full ${stageNumber <= currentStage ? "bg-primary" : "bg-muted"}`} />;
              })}
          </div>
          <span className="text-sm text-muted-foreground">Stage {currentStage + 1} of 4</span>
        </div>
      </div>

      {renderCurrentStage()}
    </div>
  );
}
