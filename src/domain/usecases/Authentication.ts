import { AccountModel } from '@/domain/model';

export type AuthenticationParams = {
    email: string;
    password: string;
}

export interface Authentication{
    auth(params: AuthenticationParams): Promise<AccountModel>;
}
