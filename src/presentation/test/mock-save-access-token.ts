import { SaveAccessToken } from '@/domain/usecases';

export class SaveAccessTokenMock implements SaveAccessToken {
  value: string;

  async save (accessToken: string) : Promise<void> {
    this.value = accessToken;
  };
}
