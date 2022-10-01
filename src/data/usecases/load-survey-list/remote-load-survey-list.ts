import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';
import { SurveyAnswerModel, SurveyModel } from '@/domain/model';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly getDatabase: GetDatabase<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const response = await this.getDatabase.get({ url: this.url });
    const surveys = response.body || [];
    switch (response.statusCode) {
      case StatusCode.ok: return surveys.map(survey => Object.assign(survey, { date: new Date(survey.date) }));
      case StatusCode.noContent: return [];
      default: throw new UnexpectedError();
    };
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string,
    question: string,
    answers: SurveyAnswerModel[],
    date: string,
    didAnswer: boolean
  };
}
