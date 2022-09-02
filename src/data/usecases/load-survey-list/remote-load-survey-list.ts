import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/model';

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly getDatabase: GetDatabase<SurveyModel[]>
  ) {}

  async loadAll (): Promise<void> {
    const response = await this.getDatabase.get({ url: this.url });
    switch (response.statusCode) {
      case StatusCode.ok: break;
      default: throw new UnexpectedError();
    };
  }
}
