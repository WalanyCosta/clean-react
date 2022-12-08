import { RemoteLoadSurveyResult } from '@/data/usecases';
import { useParams } from 'react-router-dom';
import { makeGetDatabaseFirebase } from '../../firebase/get-database';

export const makeRemoteLoadSurveyResult = (): RemoteLoadSurveyResult => {
  const { id } = useParams();
  return new RemoteLoadSurveyResult(makeGetDatabaseFirebase(), `/surveys/${id}`);
};
