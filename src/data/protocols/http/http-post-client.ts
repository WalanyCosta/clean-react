export type HttpPostParams ={
  url: string;
  body: Object;
}

export interface HttpPostClient{
  post(params: HttpPostParams): Promise<void>;
}
