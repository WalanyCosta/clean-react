import { GetDatabase } from '@/data/protocols/firebase';

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly getDatabase: GetDatabase
  ) {}

  async loadAll (): Promise<void> {
    await this.getDatabase.get({ url: this.url });
  }
}
