import { RemoteLoadSurveyList } from '@/data/usecases';
import { makeGetDatabaseFirebase } from '../../firebase/get-database';

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList => {
  return new RemoteLoadSurveyList('/surveys', makeGetDatabaseFirebase());
};
