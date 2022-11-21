import { SurveyModel } from '@/domain/model';

export interface LoadSurveyResult{
  load(): Promise<SurveyModel[]>;
}
