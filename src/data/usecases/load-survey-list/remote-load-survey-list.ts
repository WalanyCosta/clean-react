import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/model';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly getDatabase: GetDatabase<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const response = await this.getDatabase.get({ url: this.url });
    switch (response.statusCode) {
      case StatusCode.ok: return response.body;
      case StatusCode.noContent: return [];
      default: throw new UnexpectedError();
    };
  }
}
