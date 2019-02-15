import { AxiosResponse } from 'axios';

export type StreamResponse = AxiosResponse<Stream>;
export type StreamsResponse = AxiosResponse<Stream[]>;

export interface Stream {
  title: string,
  description: string,
  id: number,
  userId: string,
}