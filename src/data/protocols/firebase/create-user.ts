import { AddAccountParam } from '@/domain/usecases';
import { Response } from './response';

export interface CreateUser<T>{
    signUp(param: AddAccountParam): Promise<Response<T>>;
}
