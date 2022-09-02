import { Response } from './response';

export type GetDatabaseParam ={
  url: string
}

export interface GetDatabase<R = any>{
  get(param: GetDatabaseParam): Promise<Response<R>>;
}
