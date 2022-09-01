import { SurveyModel } from '@/domain/model';

export interface LoadSurveyList{
  loadAll(): Promise<SurveyModel>;
}
