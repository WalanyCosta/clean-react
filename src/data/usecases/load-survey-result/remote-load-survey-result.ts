import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor (
    private readonly getDatabase : GetDatabase,
    private readonly url: string
  ) {}

  async load (): Promise<void> {
    const result = await this.getDatabase.get({ url: this.url });
    switch (result.statusCode) {
      case StatusCode.ok: break;
      default: throw new UnexpectedError();
    }
  };
}
