import { GetDatabase, GetDatabaseParam } from '../protocols/firebase';

export class GetDatabaseSpy implements GetDatabase {
  url: string;

  async get (param: GetDatabaseParam): Promise<void> {
    this.url = param.url;
  }
}
