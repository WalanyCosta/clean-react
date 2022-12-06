import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/model';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly getDatabase : GetDatabase,
    private readonly url: string
  ) {}

  async load (): Promise<SurveyModel> {
    const response = await this.getDatabase.get({ url: this.url });
    const remoteSurveyResult = response.body;
    switch (response.statusCode) {
      case StatusCode.ok: return remoteSurveyResult;
      default: throw new UnexpectedError();
    }
  };
}
