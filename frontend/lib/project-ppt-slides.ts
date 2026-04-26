export type SlideStatus = 'implemented' | 'planned';

export interface ProjectSlideTag {
   label: string;
   status?: SlideStatus;
}

export interface ProjectSlideSection {
   title: string;
   points: string[];
   tone?: 'default' | 'problem' | 'solution';
}

export interface ProjectSlideCard {
   title: string;
   description: string;
   status: SlideStatus;
}

export interface ProjectPptSlide {
   id: number;
   kicker: string;
   title: string;
   summary: string;
   tags?: ProjectSlideTag[];
   sections?: ProjectSlideSection[];
   cards?: ProjectSlideCard[];
   footer?: string;
}

export const PROJECT_PPT_SLIDES: ProjectPptSlide[] = [
   {
      id: 1,
      kicker: 'Slide 1',
      title: 'Nirvana AI: Project Overview',
      summary: 'Nirvana AI is a context-aware mental wellness platform focused on continuous emotional support, reflection, and self-awareness.',
      tags: [{ label: 'College Project' }, { label: 'AI + Psychology + Design' }],
      sections: [
         {
            title: 'What We Built',
            points: [
               'A single platform where students can chat, reflect, complete guided exercises, and track emotional trends.',
               'A system that feels emotionally supportive while still being structured and measurable.',
            ],
         },
         {
            title: 'Who It Is For',
            points: ['Students handling academic pressure, stress, overthinking, self-doubt, and emotional burnout.'],
         },
      ],
      footer: 'Nirvana AI does not replace therapy. It provides support between therapy sessions or when therapy is not immediately accessible.',
   },
   {
      id: 2,
      kicker: 'Slide 2',
      title: 'Problem Statement and Product Direction',
      summary: 'Mental health tools are often generic, disconnected, and hard to access consistently.',
      sections: [
         {
            title: 'Problems Observed',
            tone: 'problem',
            points: [
               'Therapy can be expensive, time-bound, or unavailable for many students.',
               'Existing apps track data but often miss emotional context and human tone.',
               'Support is not continuous, so users face stress and confusion alone between sessions.',
            ],
         },
         {
            title: 'Our Direction',
            tone: 'solution',
            points: [
               'Provide daily, private, and structured emotional support.',
               'Guide users through reflection and CBT-inspired exercises.',
               'Focus on helping users understand themselves instead of forcing one-size-fits-all advice.',
            ],
         },
      ],
   },
   {
      id: 3,
      kicker: 'Slide 3',
      title: 'Core Features (Implemented)',
      summary: 'The primary workflow covers conversation, guided exercises, reports, and journaling insights.',
      cards: [
         {
            title: 'AI Mental Health Chatbots',
            description: 'Topic-specific chat experiences with context-aware, emotionally warm responses.',
            status: 'implemented',
         },
         {
            title: 'CBT Micro-Exercises',
            description: 'Personalized session setup, reflection prompts, and MCQ-based cognitive pattern checks.',
            status: 'implemented',
         },
         {
            title: 'AI-Generated Session Reports',
            description: 'Mood-before vs mood-after, reflection analysis, and personalized recommendations.',
            status: 'implemented',
         },
         {
            title: 'Smart Journaling + Analytics',
            description: 'Rich text journaling, journaling streaks, word trends, and writing activity visualization.',
            status: 'implemented',
         },
      ],
   },
   {
      id: 4,
      kicker: 'Slide 4',
      title: 'Additional Features and Self-Care Lab',
      summary: 'Beyond core therapy-inspired flows, Nirvana AI includes interactive self-care experiences.',
      cards: [
         {
            title: 'Mood Tracking Dashboard',
            description: 'Activity overview across journals, exercises, and conversations with trend cards.',
            status: 'implemented',
         },
         {
            title: 'Relaxation Music Deck',
            description: 'Ambient and nature-based sound experiences for calming and focus.',
            status: 'implemented',
         },
         {
            title: 'Mindful Breathing Experience',
            description: 'Interactive draggable visual flow to guide breathing cycles and affirmations.',
            status: 'implemented',
         },
         {
            title: 'Daily Uplift Wellness Cards',
            description: 'Context-linked uplifting cards and micro-actions delivered in the Self-Care Lab.',
            status: 'implemented',
         },
         {
            title: 'Gratitude Journal and Sleep Stories',
            description: 'Expanded Self-Care Lab modules designed for long-term emotional routines.',
            status: 'planned',
         },
      ],
   },
   {
      id: 5,
      kicker: 'Slide 5',
      title: 'Challenges We Faced and How We Solved Them',
      summary: 'Nirvana AI focused on solving personalization, continuity, and architectural reliability challenges.',
      sections: [
         {
            title: 'Challenge 1: Generic Advice and Low Emotional Relevance',
            tone: 'problem',
            points: ['Users disengage when responses feel robotic or disconnected from their current emotional state.'],
         },
         {
            title: 'Solution 1',
            tone: 'solution',
            points: ['Prompt design now includes mood, primary emotion, session goal, and prior context to improve emotional relevance.'],
         },
         {
            title: 'Challenge 2: Fragmented and Inconsistent User Support',
            tone: 'problem',
            points: ['Occasional chat-only support misses reflection, structure, and measurable progress tracking.'],
         },
         {
            title: 'Solution 2',
            tone: 'solution',
            points: ['We built a connected flow: setup → exercise → report → dashboard analytics → self-care reinforcement.'],
         },
         {
            title: 'Challenge 3: API Reliability Across Frontend + Backend',
            tone: 'problem',
            points: ['Keeping contracts in sync across multiple services and routes slowed delivery and increased regressions.'],
         },
         {
            title: 'Solution 3',
            tone: 'solution',
            points: ['The API was migrated to same-origin Next.js route handlers with shared validation and Mongoose service layers.'],
         },
      ],
   },
   {
      id: 6,
      kicker: 'Slide 6',
      title: 'AI Layer, Tech Stack, and Differentiation',
      summary: 'Nirvana AI combines contextual prompts, modern web architecture, and interaction-focused design.',
      sections: [
         {
            title: 'AI Intelligence Layer',
            points: [
               'Inputs used: user mood, primary emotion, past exercise reports, and conversation history.',
               'Outputs generated: exercise questions, emotional feedback, and structured report insights.',
               'Tone objective: human, empathetic, and concise instead of robotic.',
            ],
         },
         {
            title: 'Current Tech Stack (Implemented)',
            points: [
               'Frontend: Next.js 15 + Tailwind CSS + ShadCN UI.',
               'API Layer: Next.js route handlers with shared validation/services.',
               'Database: MongoDB with Mongoose models.',
               'Auth and App Infra: Clerk, React Query, Zustand.',
               'LLM + Speech Models: Groq-hosted models with custom prompt pipelines.',
            ],
         },
         {
            title: 'What Makes Nirvana Different',
            points: ['Instead of only mood logging, Nirvana adapts questions, produces report-grade insights, and keeps users engaged with interaction-rich self-care tools.'],
         },
      ],
   },
   {
      id: 7,
      kicker: 'Slide 7',
      title: 'Impact, Future Scope, and Demo Flow',
      summary: 'Nirvana AI aims to make daily mental wellness support accessible, structured, and emotionally safe.',
      tags: [
         { label: 'Current Impact', status: 'implemented' },
         { label: 'Future Scope', status: 'planned' },
      ],
      sections: [
         {
            title: 'Current Impact Vision',
            points: ['Provide private 24/7 emotional support in a low-friction product experience.', 'Help users build self-awareness and observe patterns in stress and recovery.'],
         },
         {
            title: 'Future Scope',
            points: [
               'Long-term personalization memory for deeper contextual continuity.',
               'Voice-first therapy-style sessions and richer conversational modalities.',
               'Therapist-facing insights dashboard with privacy-first controls.',
               'Optional community features and predictive well-being intelligence.',
            ],
         },
         {
            title: 'Live Demo Flow for Presentation',
            points: ['Onboarding → Chatbot topic selection → Micro-exercise → AI report view → Dashboard analytics → Self-Care Lab tools.'],
         },
      ],
      footer: 'Final Thought: Nirvana AI is designed so people do not feel alone between therapy sessions, or when therapy is not immediately available.',
   },
];
