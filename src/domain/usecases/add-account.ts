import { AccountModel } from '@/domain/model';

export type AddAccountParam = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface AddAccount{
    add(params: AddAccountParam): Promise<AccountModel>;
}
