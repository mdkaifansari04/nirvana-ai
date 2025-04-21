import axios from 'axios';
import type { MicroExercise, MicroExerciseReport, Response } from './response';
import tokenInterceptors from './token-interceptor';

const microExerciseApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/micro-exercises` });
microExerciseApi.interceptors.request.use(tokenInterceptors);

export const getMicroServices = async () => {
   const { data } = await microExerciseApi.get<Response<MicroExercise[]>>('/');
   return data.data;
};

export const getMicroExerciseReportById = async (id: string) => {
   const { data } = await microExerciseApi.get<Response<MicroExerciseReport>>(`/report/${id}`);
   return data.data;
};
