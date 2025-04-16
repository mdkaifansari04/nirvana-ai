export const demoDashboard = {
   journalStreak: 4,
   exerciseStreak: 3,

   currentMood: {
      score: 8.2,
      label: 'Excellent',
      color: 'hsl(var(--chart-1))',
   },

   recentMessages: [
      {
         id: '1',
         content: "I've been experiencing persistent sadness, loss of interest in things I used to enjoy. It's been affecting my work and relationships too!! 💔😔",
         sender: 'user',
         avatar: '/male.svg',
         time: '10:24 AM',
      },
      {
         id: '2',
         content: "I understand how challenging anxiety attacks can be. Let's work through this together. Can you tell me when these attacks typically occur?",
         sender: 'assistant',
         avatar: '/female.svg',
         time: '2:15 PM',
      },
      {
         id: '3',
         content: 'Thanks a lot amanda. Let me try to analyze that and get back to you...',
         sender: 'assistant',
         avatar: '/female.svg',
         time: '11:45 AM',
      },
   ],

   activityData: [
      { date: '2024-03-01', journal: 1, exercise: 2, message: 0 },
      { date: '2024-03-02', journal: 0, exercise: 1, message: 1 },
      { date: '2024-03-03', journal: 2, exercise: 0, message: 2 },
      { date: '2024-03-04', journal: 1, exercise: 1, message: 1 },
      { date: '2024-03-05', journal: 0, exercise: 2, message: 0 },
      { date: '2024-03-06', journal: 1, exercise: 0, message: 1 },
      { date: '2024-03-07', journal: 2, exercise: 1, message: 2 },
      { date: '2024-03-08', journal: 0, exercise: 2, message: 1 },
      { date: '2024-03-09', journal: 1, exercise: 0, message: 0 },
      { date: '2024-03-10', journal: 2, exercise: 1, message: 1 },
      { date: '2024-03-11', journal: 0, exercise: 2, message: 2 },
      { date: '2024-03-12', journal: 1, exercise: 0, message: 1 },
      { date: '2024-03-13', journal: 2, exercise: 1, message: 0 },
      { date: '2024-03-14', journal: 0, exercise: 2, message: 1 },
      { date: '2024-03-15', journal: 1, exercise: 0, message: 2 },
      { date: '2024-03-16', journal: 2, exercise: 1, message: 1 },
      { date: '2024-03-17', journal: 0, exercise: 2, message: 0 },
      { date: '2024-03-18', journal: 1, exercise: 0, message: 1 },
      { date: '2024-03-19', journal: 2, exercise: 1, message: 2 },
      { date: '2024-03-20', journal: 0, exercise: 2, message: 1 },
      { date: '2024-03-21', journal: 1, exercise: 0, message: 0 },
      { date: '2024-03-22', journal: 2, exercise: 1, message: 1 },
      { date: '2024-03-23', journal: 0, exercise: 2, message: 2 },
      { date: '2024-03-24', journal: 1, exercise: 0, message: 1 },
      { date: '2024-03-25', journal: 2, exercise: 1, message: 0 },
      { date: '2024-03-26', journal: 0, exercise: 2, message: 1 },
      { date: '2024-03-27', journal: 1, exercise: 0, message: 2 },
      { date: '2024-03-28', journal: 2, exercise: 1, message: 1 },
      { date: '2024-03-29', journal: 0, exercise: 2, message: 0 },
      { date: '2024-03-30', journal: 1, exercise: 0, message: 1 },
   ],

   chartConfig: {
      journal: {
         label: 'Journal Entries',
         color: 'hsl(var(--chart-1))',
      },
      exercise: {
         label: 'Exercises',
         color: 'hsl(var(--chart-2))',
      },
      message: {
         label: 'Messages',
         color: 'hsl(var(--chart-4))',
      },
   },
};
