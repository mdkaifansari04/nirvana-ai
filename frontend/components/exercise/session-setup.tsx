"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { EmotionSelector } from "./emotion-selector";
import { MoodRating } from "./mood-rating";
import { useGenerateMicroExercise } from "@/hooks/mutation";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import useMicroExerciseStore from "@/store/micro-exercise";

interface SessionSetupProps {
  onComplete: (data: { sessionGoal: string; moodRating: number; primaryEmotion: string }) => void;
}

export function SessionSetup({ onComplete }: SessionSetupProps) {
  const [sessionGoal, setSessionGoal] = useState("");
  const [moodRating, setMoodRating] = useState(5);
  const [primaryEmotion, setPrimaryEmotion] = useState("");
  const { mutate: generateMicroExercise, isPending } = useGenerateMicroExercise();
  const { toast } = useToast();
  const isValid = sessionGoal.trim() !== "" && primaryEmotion !== "";
  const { setGeneratedQuestion } = useMicroExerciseStore();
  const handleSubmit = () => {
    if (isValid) {
      generateMicroExercise(
        { sessionGoal, primaryEmotion, mentalHealthRate: moodRating },
        {
          onSuccess: (data) => {
            toast({
              title: "Exercise generated successfully",
              description: "Your exercise has been generated successfully",
            });
            setGeneratedQuestion(data);
            onComplete({ sessionGoal, moodRating, primaryEmotion });
          },
          onError: (error) => {
            toast({
              title: "Error generating exercise",
              description: getErrorMessage(error),
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-foreground">Mental Health Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-3">What is your goal for today's exercise?</h2>
          <Input value={sessionGoal} onChange={(e) => setSessionGoal(e.target.value)} placeholder="e.g., Managing anxiety, Improving sleep, etc." className="w-full" />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">What is your primary emotion right now?</h2>
          <EmotionSelector selectedEmotion={primaryEmotion} onSelectEmotion={setPrimaryEmotion} />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">How would you rate your mental well-being?</h2>
          <MoodRating value={moodRating} onChange={setMoodRating} />
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} disabled={!isValid || isPending} className="w-full">
            {isPending ? "Generating... " : "Generate Exercise"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
