import { HttpResponse } from './http-response';

export type HttpPostParams ={
  url: string;
  body: Object;
}

export interface HttpPostClient{
  post(params: HttpPostParams): Promise<HttpResponse>;
}
