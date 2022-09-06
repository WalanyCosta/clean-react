import { GetDatabase, GetDatabaseParam } from '@/data/protocols/firebase';
import { get, ref, getDatabase, DataSnapshot, child } from 'firebase/database';

export class GetDatabaseFirebase {
  async get (param: GetDatabaseParam): Promise<void> {
    await get(child(ref(getDatabase()), param.url));
  };
}
