import axios from "axios";
import { Response, Chatbot } from "./response";
import tokenInterceptors from "./token-interceptor";

const chatbotApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/chatbots` });
chatbotApi.interceptors.request.use(tokenInterceptors);

export const getChatbots = async () => {
  const { data } = await chatbotApi.get<Response<Chatbot[]>>("/", { withCredentials: true });
  return data.data;
};
