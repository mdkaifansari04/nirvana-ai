export interface Topic {
   id: string;
   title: string;
   icon: string; // Path to the icon image
   count?: number;
}

export interface ChatMessage {
   id: string;
   content: string;
   sender: 'user' | 'assistant';
   avatar?: string;
}

export interface TopicChat {
   id: string;
   messages: ChatMessage[];
}

export const demoTopics: Topic[] = [
   {
      id: '1',
      title: 'Mental Health',
      icon: '/female.svg',
      count: 8,
   },
   {
      id: '2',
      title: 'Stress & Anxiety',
      icon: '/male.svg',
      count: 7,
   },
];

export const demoChats: Record<string, TopicChat> = {
   '1': {
      id: '1',
      messages: [
         {
            id: '1',
            content: "Hi, Doctor. I've been feeling really down lately, and I'm not sure why. Can you help me? 😔😢",
            sender: 'user',
            avatar: '/avatars/user.png',
         },
         {
            id: '2',
            content: "Of course! I'm here to support you. 😊 Can you tell me more about how you've been feeling? Any specific symptoms or changes in your daily life?",
            sender: 'assistant',
            avatar: '/avatars/assistant.png',
         },
         {
            id: '3',
            content: "Ok, here's the symptoms for me:",
            sender: 'user',
            avatar: '/avatars/user.png',
         },
         {
            id: '4',
            content:
               "I've been experiencing persistent sadness, loss of interest in things I used to enjoy. It's been affecting my work and relationships too!! 💔😔\n\nAttached my medical history below:",
            sender: 'user',
            avatar: '/avatars/user.png',
         },
         {
            id: '5',
            content: 'Thanks a lot amanda. Let me try to analyze that and get back to you...',
            sender: 'assistant',
            avatar: '/avatars/assistant.png',
         },
      ],
   },
   '2': {
      id: '2',
      messages: [
         {
            id: '1',
            content: "I've been having anxiety attacks lately. What can I do?",
            sender: 'user',
            avatar: '/avatars/user.png',
         },
         {
            id: '2',
            content: "I understand how challenging anxiety attacks can be. Let's work through this together. Can you tell me when these attacks typically occur?",
            sender: 'assistant',
            avatar: '/avatars/assistant.png',
         },
      ],
   },
};
