import { AuthenticationParams } from '@/domain/usecases';
import { Response } from './response';

export interface AuthFirebase <T>{
  authFirebase(param: AuthenticationParams): Promise<Response<T>>;
}
