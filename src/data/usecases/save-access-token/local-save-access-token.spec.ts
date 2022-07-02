import { SetStorageSpy } from '@/data/test';
import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('should call setStorage with correct value', async () => {
    const setStorage = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorage);
    const accessToken = faker.random.alphaNumeric(10);
    await sut.save(accessToken);
    expect(setStorage.key).toBe('accessToken');
    expect(setStorage.value).toBe(accessToken);
  });
});
