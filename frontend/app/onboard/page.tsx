"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/mutation";
import { useToast } from "@/hooks/use-toast";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { getErrorMessage } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";

const steps = [
  { id: 0, name: "Health Info" },
  { id: 1, name: "Symptoms" },
];

export default function OnboardPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [healthInput, setHealthInput] = useState("");
  const [stepValidationState, setStepValidationState] = useState<boolean[]>([false, false, true]);
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { toast } = useToast();
  const { user } = useUser();

  const { age, setAge, weight, setWeight, gender, setGender, healthSymptoms, setHealthSymptoms } = useOnboardingStore();

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: { [key: string]: string } = {};
      let isValid = true;

      switch (step) {
        case 0: // Health Data step (Age, Weight, Gender)
          // Validate age
          if (!age) {
            newErrors.age = "Age is required";
            isValid = false;
          } else if (Number.isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
            newErrors.age = "Age must be a valid number between 1 and 120";
            isValid = false;
          }

          // Validate weight
          if (!weight) {
            newErrors.weight = "Weight is required";
            isValid = false;
          } else if (Number.isNaN(Number(weight)) || Number(weight) <= 0) {
            newErrors.weight = "Weight must be a valid number greater than 0";
            isValid = false;
          }

          // Validate gender
          if (!gender) {
            newErrors.gender = "Gender selection is required";
            isValid = false;
          }
          break;

        case 1: // Health Symptoms - no required validation
          isValid = true;
          break;
      }

      setErrors(newErrors);
      return isValid;
    },
    [age, weight, gender]
  );

  // Use a separate effect to update step validation state
  // This prevents circular dependencies
  const updateValidationState = useCallback((step: number, isValid: boolean) => {
    setStepValidationState((prev) => {
      const newState = [...prev];
      newState[step] = isValid;
      return newState;
    });
  }, []);

  // Update validation state when field values change
  useEffect(() => {
    const isValid = validateStep(0);
    updateValidationState(0, isValid);
  }, [validateStep, updateValidationState]);

  useEffect(() => {
    const isValid = validateStep(1);
    updateValidationState(1, isValid);
  }, [validateStep, updateValidationState]);

  const handleNext = () => {
    const isValid = validateStep(activeStep);
    updateValidationState(activeStep, isValid);

    if (isValid && activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    const userData = {
      age: Number(age),
      weight: Number(weight),
      gender,
      healthSymptoms,
    };

    updateUser(
      { userId: user?.id!, age: userData.age, weight: userData.weight, gender: userData.gender, symptom: userData.healthSymptoms },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error: Error) => {
          toast({
            title: "Oops ! something went wrong.",
            description: getErrorMessage(error),
          });
        },
      }
    );
  };

  const addSymptom = () => {
    if (healthInput.trim()) {
      setHealthSymptoms([...healthSymptoms, healthInput.trim()]);
      setHealthInput("");
    }
  };

  const removeSymptom = (index: number) => {
    setHealthSymptoms(healthSymptoms.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50 p-2 sm:p-4">
      <div className="pt-4 sm:pt-8 w-full max-w-3xl bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
        <div className="px-4 sm:px-8 border-border">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome to Nirvana.AI</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Let's get to know you better to provide a personalized experience.</p>
        </div>

        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Custom Stepper */}
          <div className="flex items-center justify-center w-full px-2 sm:px-6 py-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (step.id < activeStep) {
                        setActiveStep(step.id);
                        return;
                      }
                      const isValid = validateStep(activeStep);
                      updateValidationState(activeStep, isValid);
                      if (isValid && step.id === activeStep + 1) {
                        setActiveStep(step.id);
                      }
                    }}
                    disabled={step.id > activeStep + 1 || (step.id > activeStep && !stepValidationState[activeStep])}
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${activeStep === step.id ? "bg-primary text-primary-foreground border-primary" : activeStep > step.id ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-muted-foreground/30"}`}
                  >
                    {activeStep > step.id ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <span className="text-xs sm:text-sm font-medium">{step.id + 1}</span>}
                  </button>
                </div>
                {index < steps.length - 1 && <div className={`h-[2px] flex-1 mx-1 sm:mx-2 ${activeStep > index ? "bg-primary" : "bg-muted-foreground/30"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-muted/50 border border-border p-4 sm:p-8 rounded-xl shadow-sm">
            {/* Health Info step */}
            {activeStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Health Information</h2>
                <div className="space-y-4">
                  {/* Age field */}
                  <div className="space-y-2">
                    <label htmlFor="age-input" className="text-sm font-medium">
                      Your age
                    </label>
                    <Input id="age-input" type="number" placeholder="Your age in years" value={age} onChange={(e) => setAge(e.target.value)} className={`h-12 text-base ${errors.age ? "border-red-500" : ""}`} />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                  </div>

                  {/* Weight field */}
                  <div className="space-y-2">
                    <label htmlFor="weight-input" className="text-sm font-medium">
                      Your weight (kg)
                    </label>
                    <Input id="weight-input" type="number" placeholder="Your weight in kilograms" value={weight} onChange={(e) => setWeight(e.target.value)} className={`h-12 text-base ${errors.weight ? "border-red-500" : ""}`} />
                    {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
                  </div>

                  {/* Gender selection */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Your gender</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setGender("male")} className={`h-30 relative flex-1 rounded-2xl overflow-hidden border-2 transition-all ${gender === "male" ? "border-black" : "border-neutral-200 hover:border-neutral-300"}`}>
                        <div
                          className={`
                                       p-4 flex items-start
                                       bg-[#F5F5F5] bg-opacity-30
                                    `}
                        >
                          <div className="flex flex-col items-start">
                            <span className="flex items-center text-2xl font-medium mb-1">Male</span>
                          </div>
                          <div className="flex-grow">
                            <Image src="/male.svg" width={180} height={180} alt="Male" className="ml-auto" />
                          </div>
                        </div>
                      </button>
                      <button type="button" onClick={() => setGender("female")} className={`h-30 relative flex-1 rounded-2xl overflow-hidden border-2 transition-all ${gender === "female" ? "border-black" : "border-neutral-200 hover:border-neutral-300"}`}>
                        <div
                          className={`
                                       p-4 flex items-start
                                       bg-[#F5F5F5] bg-opacity-30
                                    `}
                        >
                          <div className="flex flex-col items-start">
                            <span className="flex items-center text-2xl font-medium mb-1">Female</span>
                          </div>
                          <div className="flex-grow">
                            <Image src="/female.svg" width={180} height={180} alt="Female" className="ml-auto" />
                          </div>
                        </div>
                      </button>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender}</p>}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-neutral-900">Any health symptoms you're experiencing?</h2>
                  <p className="text-neutral-600">This helps us understand your health concerns.</p>
                  <div className="flex gap-2">
                    <Input
                      id="symptom-input"
                      type="text"
                      placeholder="Add a health symptom"
                      value={healthInput}
                      onChange={(e) => setHealthInput(e.target.value)}
                      className="flex-1 h-12 text-base"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSymptom();
                        }
                      }}
                    />
                    <Button onClick={addSymptom} className="h-12">
                      Add
                    </Button>
                  </div>

                  {healthSymptoms.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3 text-neutral-700">Your symptoms:</h3>
                      <div className="flex flex-wrap gap-2">
                        {healthSymptoms.map((symptom) => (
                          <div key={`symptom-${symptom}`} className="bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 border border-primary/20 text-sm">
                            <span>{symptom}</span>
                            <button type="button" onClick={() => removeSymptom(healthSymptoms.indexOf(symptom))} className="text-sm hover:text-red-500 font-bold">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-500 text-sm mt-4">No symptoms added yet.</p>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <Image src="/health-symptoms.svg" width={250} height={250} alt="Health Symptoms" className="w-full h-auto" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 0} className="w-full sm:w-1/2 h-10 sm:h-12">
              Previous
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button type="button" variant="outline" onClick={handleNext} className="w-full sm:w-1/2 h-10 sm:h-12" disabled={!stepValidationState[activeStep]}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} className="w-full sm:w-1/2 h-10 sm:h-12">
                Submit 🎉
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
