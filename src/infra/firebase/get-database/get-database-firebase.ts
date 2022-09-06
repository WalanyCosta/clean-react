import { GetDatabase, GetDatabaseParam } from '@/data/protocols/firebase';
import { get, ref, getDatabase, child } from 'firebase/database';

export class GetDatabaseFirebase implements GetDatabase<any> {
  async get (param: GetDatabaseParam): Promise<any> {
    try {
      const response = await get(child(ref(getDatabase()), param.url));
      return {
        statusCode: 200,
        body: response.val()
      };
    } catch (error) {
      return {
        statusCode: 500
      };
    }
  };
}
