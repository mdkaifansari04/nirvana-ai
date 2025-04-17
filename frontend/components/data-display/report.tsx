"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Target, BarChart3, FileText, MessageSquare, BrainCircuit, Sparkles, TrendingUp, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodChart } from "@/components/data-display/mood-chart";
import { McqDonutChart } from "@/components/data-display/mcq-donut-chart";
import { format } from "date-fns";
import { MicroExerciseReport } from "@/data-access/response";

interface ReportPageProps {
  report: MicroExerciseReport;
}

export default function ReportPage({ report }: ReportPageProps) {
  const handleDownloadPDF = () => {
    // PDF download functionality would be implemented here
    alert("Downloading PDF report...");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch (e) {
      return dateString;
    }
  };

  const getCopingQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  const getProgressLevelColor = (level: "Improving" | "Stable" | "Declining") => {
    switch (level) {
      case "Improving":
        return "text-green-600 dark:text-green-400";
      case "Stable":
        return "text-yellow-600 dark:text-yellow-400";
      case "Declining":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getProgressLevelEmoji = (level: "Improving" | "Stable" | "Declining") => {
    switch (level) {
      case "Improving":
        return "🚀";
      case "Stable":
        return "⚖️";
      case "Declining":
        return "📉";
      default:
        return "📊";
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    const emotions: Record<string, string> = {
      anxiety: "😰",
      stress: "😓",
      fear: "😨",
      sadness: "😢",
      anger: "😠",
      frustration: "😤",
      happiness: "😊",
      joy: "😄",
      calm: "😌",
      relief: "😅",
      hope: "🙏",
      gratitude: "🙏",
      confusion: "😕",
      overwhelm: "😩",
    };

    const lowerEmotion = emotion.toLowerCase();
    return emotions[lowerEmotion] || "🙂";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary bg-clip-text">
          Nirwana AI <span className="text-xl font-normal text-gray-700 dark:text-gray-300">Wellness Report</span>
        </h1>
        <div className="flex gap-2">
          <Button className="!rounded-sm" variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      {/* Header Section */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10  flex items-center justify-center text-2xl">{report.header.student_name.charAt(0)}</div>
              <div>
                <h2 className="text-xl font-semibold">{report.header.student_name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {formatDate(report.header.session_date)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Target className="h-3 w-3 mr-1" /> Session Goal
                </p>
                <p className="text-sm font-medium">{report.header.session_goal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <FileText className="h-3 w-3 mr-1" /> Session ID
                </p>
                <p className="text-sm font-mono">{report.header.session_id}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Mood Summary */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">Mood Summary</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Mood Before</span>
                  <span className="text-sm font-medium">{report.mood_summary.mood_before}/10</span>
                </div>
                <Progress value={report.mood_summary.mood_before * 10} className="h-2" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Mood After</span>
                  <span className="text-sm font-medium">{report.mood_summary.mood_after}/10</span>
                </div>
                <Progress value={report.mood_summary.mood_after * 10} className="h-2" />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="text-lg">{getEmotionEmoji(report.mood_summary.primary_emotion)}</div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Primary Emotion</p>
                  <p className="font-medium">{report.mood_summary.primary_emotion}</p>
                </div>
              </div>
            </div>

            <div>
              <MoodChart before={report.mood_summary.mood_before} after={report.mood_summary.mood_after} />

              <div className={`mt-4 text-center ${report.mood_summary.mood_delta > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                <p className="font-medium">{report.mood_summary.mood_delta > 0 ? `Mood improved by ${report.mood_summary.mood_delta} points` : `Mood decreased by ${Math.abs(report.mood_summary.mood_delta)} points`}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{report.mood_summary.emotion_shift_summary}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Reflection Analysis */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">Reflection Analysis</h3>
          </div>

          <div className="bg-primary/10  p-4 rounded-lg border-l-4 border-primary">
            <p className="text-gray-700 dark:text-gray-200 italic">"{report.reflection_analysis.summary}"</p>
          </div>
        </div>
      </Card>
      {/* Exercise QnA */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">Exercise Q&A</h3>
          </div>

          <div className="space-y-4">
            {report.exercise_qna.qna_analysis.map((qna, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 p-3">
                  <p className="font-medium text-gray-700 dark:text-gray-200">{qna.question}</p>
                </div>
                <div className="p-3 border-t">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{qna.answer}</p>
                  <div className="flex flex-wrap gap-1">
                    {qna.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Coping Quality</p>
                <Badge className={`${getCopingQualityColor(report.exercise_qna.coping_quality)}`}>{report.exercise_qna.coping_quality}</Badge>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">Recommendation</p>
                </div>
                <p className="text-sm">{report.exercise_qna.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* MCQ Evaluation */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">MCQ Evaluation</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <McqDonutChart correct={report.mcq_evaluation.correct_answers} total={report.mcq_evaluation.total_mcqs} percentage={report.mcq_evaluation.score_percent} />
            </div>

            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Feedback</p>
                <p>{report.mcq_evaluation.feedback}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Recommendations</p>
                <ul className="space-y-2">
                  {report.mcq_evaluation.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Final Reflection */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">Final Reflection</h3>
          </div>

          <Tabs defaultValue="student">
            <TabsList className="mb-4">
              <TabsTrigger value="student">Student Reflection</TabsTrigger>
              <TabsTrigger value="ai">AI Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">"{report.final_reflection.student_reflection}"</p>
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="bg-primary/10  dark:bg-gray-700 p-4 rounded-lg border-l-4 border-primary  dark:border-purple-500">
                <div className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-primary dark:text-purple-400 shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-200">{report.final_reflection.ai_summary}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
      {/* Progress Insights */}
      <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-none">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary dark:text-purple-400" />
            <h3 className="text-lg font-semibold">Progress Insights</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xl">🔥</div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Daily Streak</p>
                  <p className="text-2xl font-bold">{report.progress_insights.daily_streak} days</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xl">{getProgressLevelEmoji(report.progress_insights.progress_level)}</div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Progress Level</p>
                  <p className={`font-medium ${getProgressLevelColor(report.progress_insights.progress_level)}`}>{report.progress_insights.progress_level}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Daily Recommendations
              </p>
              <ul className="space-y-2">
                {report.progress_insights.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                    <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 mb-4">
        <p>© 2025 Nirwana AI - Supporting Indian students' mental wellness</p>
      </footer>
    </div>
  );
}
