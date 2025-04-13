export const SESSION_GOALS = ['Thought Challenger', 'Cognitive Distortion Detective', 'Gratitude Reframe', 'Values Alignment Check', 'Self-Compassion Break', 'Behavioral Activation Mini Plan'];

export const MICRO_EXERCISE_GENERATION_SCHEMA = JSON.stringify(
   {
      $defs: {
         MCQ: {
            properties: {
               question: { title: 'Question', type: 'string' },
               options: {
                  items: { type: 'string' },
                  title: 'Options',
                  type: 'array',
                  minItems: 2,
                  maxItems: 4,
               },
            },
            required: ['question', 'options'],
            title: 'MultipleChoiceQuestion',
            type: 'object',
         },
         QnA: {
            properties: {
               question: { title: 'Question', type: 'string' },
            },
            required: ['question'],
            title: 'OpenEndedQuestion',
            type: 'object',
         },
      },
      properties: {
         session_goal: { title: 'Session Goal', type: 'string' },
         core_exercise: {
            properties: {
               qna: {
                  items: { $ref: '#/$defs/QnA' },
                  title: 'Open Ended Questions',
                  type: 'array',
                  minItems: 2,
                  maxItems: 2,
               },
               mcq: {
                  items: { $ref: '#/$defs/MCQ' },
                  title: 'Multiple Choice Questions',
                  type: 'array',
                  minItems: 5,
                  maxItems: 5,
               },
            },
            required: ['qna', 'mcq'],
            title: 'Core Exercise',
            type: 'object',
         },
      },
      required: ['session_goal', 'core_exercise'],
      title: 'CBTSession',
      type: 'object',
   },
   null,
   4
);

export const MICRO_EXERCISE_REPORT_SCHEMA = JSON.stringify(
   {
      title: 'Nirwana Report',
      type: 'object',
      properties: {
         header: {
            type: 'object',
            properties: {
               student_name: { type: 'string' },
               session_date: { type: 'string', format: 'date' },
               session_id: { type: 'string' },
               session_goal: { type: 'string' },
            },
            required: ['student_name', 'session_date', 'session_id', 'session_goal'],
         },
         mood_summary: {
            type: 'object',
            properties: {
               mood_before: { type: 'number' },
               mood_after: { type: 'number' },
               primary_emotion: { type: 'string' },
               mood_delta: { type: 'number' },
               emotion_shift_summary: { type: 'string' },
            },
            required: ['mood_before', 'mood_after', 'primary_emotion', 'mood_delta', 'emotion_shift_summary'],
         },
         reflection_analysis: {
            type: 'object',
            properties: {
               summary: { type: 'string' },
            },
            required: ['summary'],
         },
         exercise_qna: {
            type: 'object',
            properties: {
               qna_analysis: {
                  type: 'array',
                  items: {
                     type: 'object',
                     properties: {
                        question: { type: 'string' },
                        answer: { type: 'string' },
                        tags: {
                           type: 'array',
                           items: { type: 'string' },
                        },
                     },
                     required: ['question', 'answer', 'tags'],
                  },
               },
               coping_quality: { type: 'string' },
               recommendation: { type: 'string' },
            },
            required: ['qna_analysis', 'coping_quality', 'recommendation'],
         },
         mcq_evaluation: {
            type: 'object',
            properties: {
               total_mcqs: { type: 'number' },
               correct_answers: { type: 'number' },
               score_percent: { type: 'number' },
               feedback: { type: 'string' },
               recommendations: {
                  type: 'array',
                  items: { type: 'string' },
               },
            },
            required: ['total_mcqs', 'correct_answers', 'score_percent', 'feedback', 'recommendations'],
         },
         final_reflection: {
            type: 'object',
            properties: {
               student_reflection: { type: 'string' },
               ai_summary: { type: 'string' },
            },
            required: ['student_reflection', 'ai_summary'],
         },
         progress_insights: {
            type: 'object',
            properties: {
               progress_level: {
                  type: 'string',
                  enum: ['Improving', 'Stable', 'Declining'],
               },
               daily_streak: { type: 'number' },
               recommendations: {
                  type: 'array',
                  items: { type: 'string' },
               },
            },
            required: ['progress_level', 'daily_streak', 'recommendations'],
         },
      },
      required: ['header', 'mood_summary', 'reflection_analysis', 'exercise_qna', 'mcq_evaluation', 'final_reflection', 'progress_insights'],
   },
   null,
   4
);
