import { mockAccount } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { setCurrentAccountAdapter } from './current-account-adapter';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('should calls LocalStorageAdapter with correct values', () => {
    const account = mockAccount();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
    console.log(localStorage);
  });
});
