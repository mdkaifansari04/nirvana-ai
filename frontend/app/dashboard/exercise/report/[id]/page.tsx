import ReportPage from "@/components/data-display/report";
import { MicroExerciseReport } from "@/data-access/response";

// Sample data based on the provided interface
const sampleReport: MicroExerciseReport = {
  header: {
    student_name: "Arjun Sharma",
    session_date: "2025-04-12T14:30:00Z",
    session_id: "NIR-2025-04-12-001",
    session_goal: "Managing exam anxiety and improving focus",
  },
  mood_summary: {
    mood_before: 4,
    mood_after: 7,
    primary_emotion: "Anxiety",
    mood_delta: 3,
    emotion_shift_summary: "Significant reduction in anxiety levels after completing the breathing exercises and positive affirmations.",
  },
  reflection_analysis: {
    summary: "Arjun showed openness to exploring his exam-related stress triggers. He identified that perfectionism and parental expectations are key factors contributing to his anxiety. The session helped him recognize that setting realistic goals and practicing self-compassion can reduce his stress levels.",
  },
  exercise_qna: {
    qna_analysis: [
      {
        _id: "1",
        question: "What thoughts come to mind when you imagine your upcoming exams?",
        answer: "I feel overwhelmed thinking about the amount of material I need to cover. I worry that I won't meet my parents' expectations, and I keep imagining the worst-case scenarios.",
        tags: ["anxiety", "perfectionism", "catastrophizing"],
      },
      {
        _id: "2",
        question: "What has helped you manage stress in the past?",
        answer: "Taking short breaks to listen to music, talking to my friend Raj who always calms me down, and breaking large tasks into smaller ones.",
        tags: ["coping-skills", "social-support", "task-management"],
      },
    ],
    coping_quality: "Moderate",
    recommendation: "Practice the 5-4-3-2-1 grounding technique when feeling overwhelmed. Continue breaking large tasks into smaller, manageable chunks.",
  },
  mcq_evaluation: {
    total_mcqs: 10,
    correct_answers: 7,
    score_percent: 70,
    feedback: "Good understanding of stress management concepts. Areas for improvement include recognizing cognitive distortions and implementing mindfulness practices.",
    recommendations: ["Review the module on cognitive distortions", "Practice the 10-minute mindfulness exercise daily", "Complete the 'Challenging Negative Thoughts' worksheet"],
  },
  final_reflection: {
    student_reflection: "I feel more equipped to handle my anxiety now. Breaking down my study schedule and practicing breathing exercises seems doable. I'm still worried about my parents' expectations, but I think I can have an honest conversation with them.",
    ai_summary: "Arjun has made good progress in identifying his stress triggers and developing practical coping strategies. He shows willingness to implement new techniques and has realistic expectations about the process.",
  },
  progress_insights: {
    progress_level: "Improving",
    daily_streak: 5,
    recommendations: ["Continue your daily mindfulness practice", "Use the 'Stress Diary' feature to track triggers", "Try the 'Progressive Muscle Relaxation' exercise before bed"],
  },
  _id: "sample-id",
  userClerkId: "sample-user-clerk-id",
  createdAt: "2025-04-12T14:30:00Z",
  updatedAt: "2025-04-12T14:30:00Z",
  __v: 0,
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <ReportPage report={sampleReport} />
    </main>
  );
}
