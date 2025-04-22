"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedExercisesQuestion } from "@/data-access/response";

interface CoreExerciseProps {
  exerciseContent: GeneratedExercisesQuestion;
  sessionGoal: string;
  onStartExercise: () => void;
}

export function CoreExercise({ exerciseContent, sessionGoal, onStartExercise }: CoreExerciseProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-foreground">{sessionGoal}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Reflection Questions</h3>
          {exerciseContent.core_exercise.qna.map((qa) => (
            <div key={`core-qna-${qa.question}`} className="mb-4 bg-muted/20 p-3 rounded-md border">
              <h3 className="font-medium text-base">{qa.question}</h3>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Multiple Choice Questions</h3>
          {exerciseContent.core_exercise.mcq.map((mc) => (
            <div key={`core-mcq-${mc.question}`} className="mb-4 bg-muted/20 p-3 rounded-md border">
              <h3 className="font-medium text-base">{mc.question}</h3>
              <div className="mt-2 space-y-1">
                {mc.options.map((option) => (
                  <div key={`option-${mc.question}-${option}`} className="text-sm">
                    • {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button onClick={onStartExercise} className="w-full">
            Start Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
