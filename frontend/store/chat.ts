import { create } from 'zustand';

export interface Message {
   sender: 'user' | 'model';
   message: string;
}

interface StoreSchema {
   chat: Message[];
   setChat: (message: Message) => void;
   loading: boolean;
   setLoading: (value: boolean) => void;
   resetChat: () => void;
   streamText: string;
   setStreamText: (value: string) => void;
   resetStream: () => void;
}

const useChatStore = create<StoreSchema>()((set, get) => ({
   chat: [],
   streamText: '',
   loading: false,
   setChat: (message) => {
      set({ chat: [...get().chat, message] });
   },
   resetChat: () => set({ chat: [] }),
   setLoading: (value) => set({ loading: value }),
   setStreamText: (text) => set({ streamText: get().streamText + text }),
   resetStream: () => set({ streamText: '' }),
}));

export default useChatStore;
