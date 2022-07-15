import { AccountModel } from '@/domain/model';

export type AddAccountParam = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface AddAccount{
    auth(params: AddAccountParam): Promise<AccountModel>;
}
