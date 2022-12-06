
import { SurveyModel } from '@/domain/model';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';
import faker from '@faker-js/faker';

export const mockSurveyResultModel = (): SurveyModel => ({
  question: faker.random.words(),
  date: faker.date.future(),
  answers: [
    {
      answer: faker.random.words(),
      image: faker.image.imageUrl(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.words(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: false
    }
  ]
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async load (): Promise<SurveyModel> {
    this.callsCount++;
    return this.surveyResult;
  }
}
