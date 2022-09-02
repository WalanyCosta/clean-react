export type GetDatabaseParam ={
  url: string
}

export interface GetDatabase{
  get(param: GetDatabaseParam): Promise<void>;
}
