import { GetDatabase, StatusCode } from '@/data/protocols/firebase';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/model';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly getDatabase : GetDatabase<RemoteLoadSurveyResult.Model>,
    private readonly url: string
  ) {}

  async load (): Promise<SurveyModel> {
    const response = await this.getDatabase.get({ url: this.url });
    const survey = response.body;
    switch (response.statusCode) {
      case StatusCode.ok: return Object.assign(survey, { date: new Date(survey.date) });
      default: throw new UnexpectedError();
    }
  };
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    id?: string,
    question: string,
    answers: Array<{
      answer: string,
      image?: string,
      count?: number,
      percent?: number,
      isCurrentAccountAnswer: boolean
    }>,
    date: string
  };
}
