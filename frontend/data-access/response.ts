export interface Response<T = any> {
  data: T;
  message: string;
  status: number;
}

export interface Chatbot {
  _id: string;
  name: string;
  system_prompt: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Chat {
  _id: string;
  userClerkId: string;
  chatbot: string;
  messages: Array<{
    sender: "user" | "model";
    text: string;
    timestamps: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Journal {
  _id: string;
  userClerkId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
