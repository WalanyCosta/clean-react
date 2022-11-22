import { GetDatabase } from '@/data/protocols/firebase';

export class RemoteLoadSurveyResult {
  constructor (
    private readonly getDatabase : GetDatabase,
    private readonly url: string
  ) {}

  async load (): Promise<void> {
    this.getDatabase.get({ url: this.url });
  };
}
