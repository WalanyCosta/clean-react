import { AccountModel } from '@/domain/model';
import { createContext } from 'react';

type Props = {
  setCurrentAccount?: (account: AccountModel) => void;
  getCurrentAccount?: () => AccountModel;
}

export const ApiContext = createContext<Props>(null);
