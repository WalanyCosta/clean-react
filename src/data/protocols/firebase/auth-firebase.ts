import { AuthenticationParams } from '@/domain/usecases';

export interface AuthFirebase {
  authFirebase(param: AuthenticationParams): Promise<void>;
}
