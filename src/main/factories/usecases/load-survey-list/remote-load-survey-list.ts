import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';
import { makeGetDatabaseFirebase } from '../../firebase/get-database';

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList => {
  return new RemoteLoadSurveyList('/surveys', makeGetDatabaseFirebase());
};
