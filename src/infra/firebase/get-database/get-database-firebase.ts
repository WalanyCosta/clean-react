import { GetDatabase, GetDatabaseParam } from '@/data/protocols/firebase';
import { get, ref, getDatabase, DataSnapshot, child } from 'firebase/database';

export class GetDatabaseFirebase implements GetDatabase<any> {
  async get (param: GetDatabaseParam): Promise<any> {
    const response = await get(child(ref(getDatabase()), param.url));

    return {
      statusCode: 200,
      body: response.val()
    };
  };
}
