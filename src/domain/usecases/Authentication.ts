import { AccountModel } from 'domain/model/Account-model';

type AuthenticationParams = {
    email: string;
    password: string;
}

export interface Authentication{
    auth(params: AuthenticationParams): Promise<AccountModel>;
}
