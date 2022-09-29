import { SurveyModel } from '@/domain/model';
import { mockSurveyList } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyList();

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}
