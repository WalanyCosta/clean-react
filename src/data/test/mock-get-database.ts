import { GetDatabase, GetDatabaseParam, Response, StatusCode } from '../protocols/firebase';

export class GetDatabaseSpy<R = any> implements GetDatabase<R> {
  url: string;
  response = {
    statusCode: StatusCode.ok
  };

  async get (param: GetDatabaseParam): Promise<Response<R>> {
    this.url = param.url;
    return this.response;
  }
}
