import axios from "axios";

import { Response, WellnessCard } from "./response";

const wellnessApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
});

export const getWellnessCard = async (body: { userContext: string }) => {
    const { data } = await wellnessApi.post<Response<WellnessCard[]>>("/wellness-cards/generate", body);
    return data.data;
};