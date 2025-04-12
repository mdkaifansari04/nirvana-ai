import type { ActivityDay, ExerciseSummary, MicroExercise } from '@/types';
import { eachDayOfInterval, format, isSameDay, isThisWeek, subDays } from 'date-fns';

const today = new Date();
const sixMonthsAgo = subDays(today, 180);

export const demoExercises: MicroExercise[] = [
   {
      id: '1',
      userClerkId: 'user_123',
      session_goal: 'Managing anxiety and stress',
      quick_check_in: {
         mood_rating: 4,
         primary_emotion: 'Anxious',
      },
      exercise_content: {
         qna: [
            {
               question: 'What triggers your anxiety most frequently?',
               answer: 'Work deadlines and unexpected changes to my schedule. I also feel anxious in crowded places or when I have to speak in front of large groups.',
            },
            {
               question: 'What has helped you manage your anxiety in the past?',
               answer: 'Deep breathing exercises, going for walks, and talking to close friends. Sometimes writing down my worries helps me put things in perspective.',
            },
         ],
         mcq: [
            {
               question: 'How often do you experience anxiety?',
               options: ['Daily', 'Several times a week', 'Once a week', 'A few times a month', 'Rarely'],
               answers: ['Several times a week'],
            },
            {
               question: 'Which of these physical symptoms do you experience when anxious?',
               options: ['Racing heart', 'Shortness of breath', 'Sweating', 'Nausea', 'Dizziness'],
               answers: ['Racing heart', 'Shortness of breath', 'Sweating'],
            },
            {
               question: 'Which coping mechanisms have you tried?',
               options: ['Deep breathing', 'Meditation', 'Exercise', 'Talking to someone', 'Distraction techniques'],
               answers: ['Deep breathing', 'Exercise', 'Talking to someone'],
            },
            {
               question: 'How does anxiety impact your daily life?',
               options: ['Affects sleep', 'Reduces productivity', 'Influences relationships', 'Limits activities', 'Impacts physical health'],
               answers: ['Affects sleep', 'Reduces productivity'],
            },
            {
               question: 'What time of day is your anxiety typically worst?',
               options: ['Morning', 'Afternoon', 'Evening', 'Night', 'Varies significantly'],
               answers: ['Morning', 'Night'],
            },
         ],
      },
      user_reflection: {
         mood_rating_after: 6,
         reflection:
            'I realized that my anxiety often stems from work deadlines. The breathing exercises suggested were helpful. I need to create better boundaries around work hours and make time for relaxation.',
      },
      ai_generated_report: {
         review:
            "You identified work-related stressors as primary anxiety triggers. You've found breathing exercises and talking to friends helpful for managing symptoms. Your anxiety is most prominent in the mornings and at night, often affecting your sleep quality.",
         feedback:
            'Consider practicing the 4-7-8 breathing technique daily and setting boundaries around work hours. Schedule short breaks throughout your day to reset. A bedtime routine that includes relaxation techniques may help with sleep-related anxiety.',
      },
      createdAt: subDays(today, 15).toISOString(),
      updatedAt: subDays(today, 15).toISOString(),
   },
   {
      id: '2',
      userClerkId: 'user_123',
      session_goal: 'Improving sleep quality',
      quick_check_in: {
         mood_rating: 5,
         primary_emotion: 'Tired',
      },
      exercise_content: {
         qna: [
            {
               question: 'Describe your typical bedtime routine in detail.',
               answer:
                  'I usually finish work around 8pm, then have dinner while watching TV. After that, I check social media and respond to emails until about 11pm. I try to go to sleep by midnight but often find myself scrolling on my phone for another 30-60 minutes before actually falling asleep.',
            },
            {
               question: 'What thoughts typically run through your mind when trying to fall asleep?',
               answer:
                  "I often think about work tasks I need to do the next day, or replay conversations from the day. Sometimes I worry about big life decisions or finances. My mind feels like it speeds up right when I'm trying to wind down.",
            },
         ],
         mcq: [
            {
               question: 'How would you rate your overall sleep quality?',
               options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very poor'],
               answers: ['Poor'],
            },
            {
               question: 'How long does it typically take you to fall asleep?',
               options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', '1-2 hours', 'More than 2 hours'],
               answers: ['30-60 minutes'],
            },
            {
               question: 'Which sleep disturbances do you experience?',
               options: ['Waking up during the night', 'Early morning awakening', 'Difficulty falling asleep', 'Nightmares', 'Sleep apnea symptoms'],
               answers: ['Waking up during the night', 'Difficulty falling asleep'],
            },
            {
               question: 'Which of these factors might be affecting your sleep?',
               options: ['Screen time before bed', 'Caffeine consumption', 'Irregular sleep schedule', 'Stress', 'Physical discomfort'],
               answers: ['Screen time before bed', 'Stress', 'Irregular sleep schedule'],
            },
            {
               question: 'Which sleep improvement strategies have you tried?',
               options: ['Sleep hygiene practices', 'Meditation', 'Limiting caffeine', 'Regular exercise', 'Sleep restriction'],
               answers: ['Limiting caffeine', 'Regular exercise'],
            },
         ],
      },
      user_reflection: {
         mood_rating_after: 7,
         reflection:
            "I realized I'm spending too much time on my phone before bed. Screen time and an irregular sleep schedule are clearly affecting my sleep quality. I need to establish a more consistent bedtime routine and reduce screens at night.",
      },
      ai_generated_report: {
         review:
            'Your responses indicate that screen time, stress, and an irregular sleep schedule are primary factors affecting your sleep quality. You recognize the need to establish better pre-sleep habits and have already tried limiting caffeine and exercising regularly.',
         feedback:
            'Implement a 30-minute tech-free wind-down period before bed. Consider setting a consistent sleep schedule, even on weekends, to regulate your circadian rhythm. A bedtime routine including reading or gentle stretching may replace screen time effectively.',
      },
      createdAt: subDays(today, 10).toISOString(),
      updatedAt: subDays(today, 10).toISOString(),
   },
   {
      id: '3',
      userClerkId: 'user_123',
      session_goal: 'Building self-confidence',
      quick_check_in: {
         mood_rating: 5,
         primary_emotion: 'Insecure',
      },
      exercise_content: {
         qna: [
            {
               question: 'What accomplishments are you most proud of in your life?',
               answer:
                  "Completing my degree while working part-time, learning a new language on my own, and improving my public speaking skills compared to where I started. I'm also proud of the relationships I've maintained with close friends over many years.",
            },
            {
               question: 'In what situations do you feel most confident in yourself?',
               answer:
                  "I feel most confident when I'm working on creative projects, especially writing or design work. I also feel confident when I'm in one-on-one conversations or small group settings with people I know well.",
            },
         ],
         mcq: [
            {
               question: 'How often do you experience self-doubt?',
               options: ['Almost constantly', 'Several times a day', 'A few times a week', 'Occasionally', 'Rarely'],
               answers: ['Several times a day'],
            },
            {
               question: 'Which areas of your life are most affected by low confidence?',
               options: ['Professional life', 'Social situations', 'Romantic relationships', 'Family dynamics', 'Personal goals'],
               answers: ['Professional life', 'Social situations', 'Personal goals'],
            },
            {
               question: 'Which of these negative thought patterns do you experience?',
               options: ['Comparing to others', 'All-or-nothing thinking', 'Catastrophizing', 'Mind reading', 'Discounting positives'],
               answers: ['Comparing to others', 'Mind reading', 'Discounting positives'],
            },
            {
               question: 'How do you typically respond to compliments?',
               options: ['Accept graciously', 'Deflect or minimize', 'Feel uncomfortable', 'Disbelieve them', 'Quickly change the subject'],
               answers: ['Deflect or minimize', 'Feel uncomfortable'],
            },
            {
               question: 'Which of these confidence-building activities appeal to you?',
               options: ['Learning new skills', 'Physical exercise', 'Positive affirmations', 'Stepping outside comfort zone', 'Celebrating small wins'],
               answers: ['Learning new skills', 'Celebrating small wins', 'Stepping outside comfort zone'],
            },
         ],
      },
      user_reflection: {
         mood_rating_after: 7,
         reflection:
            "I need to focus more on my achievements instead of comparing myself to others. It's important to recognize that I have strengths and that everyone's journey is different. I should work on accepting compliments better and acknowledging my successes.",
      },
      ai_generated_report: {
         review:
            'You identified a tendency to compare yourself to others, engage in mind reading, and discount your positive qualities. Social situations and professional environments particularly trigger your self-doubt, despite having accomplishments you can be proud of.',
         feedback:
            'Practice recognizing and challenging negative self-talk. Start a "wins journal" to document daily accomplishments, no matter how small. Work on accepting compliments graciously - try simply saying "thank you" without deflecting. Regular reminders of your past successes can help build confidence in new situations.',
      },
      createdAt: subDays(today, 7).toISOString(),
      updatedAt: subDays(today, 7).toISOString(),
   },
   {
      id: '4',
      userClerkId: 'user_123',
      session_goal: 'Managing work-related stress',
      quick_check_in: {
         mood_rating: 3,
         primary_emotion: 'Overwhelmed',
      },
      exercise_content: {
         qna: [
            {
               question: 'What aspects of your work do you find most stressful?',
               answer:
                  'Tight deadlines, unclear expectations from management, and the constant stream of emails and messages that require immediate attention. Meetings that could have been emails also take up valuable time I could use to complete tasks.',
            },
            {
               question: 'How does work stress typically manifest in your daily life?',
               answer:
                  "I have trouble sleeping, feel tense in my shoulders and neck, and often find myself checking work emails even during personal time. I've been more irritable with family members and have less energy for hobbies and activities I usually enjoy.",
            },
         ],
         mcq: [
            {
               question: 'How often do you work beyond your scheduled hours?',
               options: ['Daily', 'Several times a week', 'Once a week', 'Occasionally', 'Never'],
               answers: ['Daily'],
            },
            {
               question: 'Which boundaries do you currently struggle to maintain?',
               options: ['Taking breaks during workday', 'Disconnecting after work hours', 'Taking vacation time', 'Saying no to additional tasks', 'Delegating responsibilities'],
               answers: ['Disconnecting after work hours', 'Saying no to additional tasks', 'Taking breaks during workday'],
            },
            {
               question: 'Which physical symptoms of stress do you experience?',
               options: ['Headaches', 'Muscle tension', 'Fatigue', 'Digestive issues', 'Sleep problems'],
               answers: ['Muscle tension', 'Fatigue', 'Sleep problems'],
            },
            {
               question: 'Which stress management techniques have you tried?',
               options: ['Meditation', 'Physical exercise', 'Time management strategies', 'Setting boundaries', 'Talking with colleagues/supervisor'],
               answers: ['Physical exercise', 'Time management strategies'],
            },
            {
               question: 'How would you rate your current work-life balance?',
               options: ['Excellent', 'Good', 'Fair', 'Poor', 'Terrible'],
               answers: ['Poor'],
            },
         ],
      },
      user_reflection: {
         mood_rating_after: 5,
         reflection:
            'I realize I need to set better boundaries around work time and personal time. Not everything needs an immediate response, and I should prioritize self-care more. I want to start scheduling breaks during my workday and establish a firm cutoff time for checking work communications.',
      },
      ai_generated_report: {
         review:
            "You're experiencing significant work stress due to unclear expectations, constant communication demands, and difficulty setting boundaries. This is affecting your physical wellbeing through muscle tension, fatigue, and sleep issues, as well as impacting your personal relationships and enjoyment of activities.",
         feedback:
            'Establish clear work-hour boundaries by turning off notifications after a certain time. Schedule short breaks throughout your workday - even 5-10 minutes can help reset your focus and reduce physical tension. Consider having a conversation with management about expectations and workload if possible. Progressive muscle relaxation before bed may help with sleep and tension issues.',
      },
      createdAt: subDays(today, 4).toISOString(),
      updatedAt: subDays(today, 4).toISOString(),
   },
   // THIS IS ONLY FOR DEMO PURPOSES
   {
      id: '5',
      userClerkId: 'user_123',
      session_goal: 'Managing work-life balance',
      quick_check_in: {
         mood_rating: 5,
         primary_emotion: '',
      },
      exercise_content: {
         qna: [
            {
               question: 'What aspects of your work-life balance need the most attention?',
               answer: '',
            },
            {
               question: 'How do you currently manage your time between work and personal activities?',
               answer: '',
            },
         ],
         mcq: [
            {
               question: 'How often do you work during your personal time?',
               options: ['Daily', 'Several times a week', 'Once a week', 'Occasionally', 'Never'],
               answers: [],
            },
            {
               question: 'Which work-life balance challenges do you face?',
               options: ['Difficulty disconnecting', 'Guilt about taking breaks', 'Overworking', 'Poor time management', 'Lack of boundaries'],
               answers: [],
            },
            {
               question: 'How does poor work-life balance affect you?',
               options: ['Reduced personal time', 'Increased stress', 'Relationship strain', 'Decreased productivity', 'Health issues'],
               answers: [],
            },
            {
               question: 'Which strategies have you tried to improve work-life balance?',
               options: ['Setting boundaries', 'Time blocking', 'Taking regular breaks', 'Delegating tasks', 'Scheduling personal time'],
               answers: [],
            },
            {
               question: 'What would an ideal work-life balance look like for you?',
               options: ['Clear work hours', 'Regular exercise time', 'Family/personal time', 'Hobby time', 'Adequate rest'],
               answers: [],
            },
         ],
      },
      user_reflection: {
         mood_rating_after: 5,
         reflection: '',
      },
      ai_generated_report: {
         review: '',
         feedback: '',
      },
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
   },
];

export const demoExerciseSummary: ExerciseSummary = (() => {
   const totalExercises = demoExercises.length;

   const completedThisWeek = demoExercises.filter((exercise) => isThisWeek(new Date(exercise.updatedAt))).length;

   const moodImprovements = demoExercises.map((exercise) => exercise.user_reflection.mood_rating_after - exercise.quick_check_in.mood_rating);

   const averageMoodImprovement = moodImprovements.reduce((sum, improvement) => sum + improvement, 0) / (moodImprovements.length || 1);

   let streak = 0;
   const sortedDates = [...demoExercises].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map((ex) => new Date(ex.updatedAt));

   if (sortedDates.length > 0) {
      streak = 1;
      for (let i = 0; i < sortedDates.length - 1; i++) {
         const currentDate = new Date(sortedDates[i]);
         const nextDate = new Date(sortedDates[i + 1]);

         currentDate.setHours(0, 0, 0, 0);
         nextDate.setHours(0, 0, 0, 0);

         const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

         if (diffDays === 1) {
            streak++;
         } else {
            break;
         }
      }
   }

   return {
      totalExercises,
      completedThisWeek,
      averageMoodImprovement,
      streak,
   };
})();

// Generate activity data (similar to journal)
export const getActivityData = (): ActivityDay[] => {
   const dateRange = eachDayOfInterval({
      start: sixMonthsAgo,
      end: today,
   });

   return dateRange.map((date) => {
      const exercisesOnDay = demoExercises.filter((exercise) => isSameDay(new Date(exercise.updatedAt), date));

      return {
         date: format(date, 'yyyy-MM-dd'),
         count: exercisesOnDay.length,
         // 0 = no entries, 1 = has entries
         level: exercisesOnDay.length === 0 ? 0 : 1,
      } as ActivityDay;
   });
};
