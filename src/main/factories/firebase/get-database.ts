import { GetDatabaseFirebase } from '@/infra/firebase/get-database/get-database-firebase';

export const makeGetDatabaseFirebase = (): GetDatabaseFirebase => {
  return new GetDatabaseFirebase();
};
