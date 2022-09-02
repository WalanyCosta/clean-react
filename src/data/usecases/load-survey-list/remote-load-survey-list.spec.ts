import faker from '@faker-js/faker';
import { GetDatabaseSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  test('should call GetDatabase with correct URL', async () => {
    const url = faker.internet.url();
    const getDatabaseSpy = new GetDatabaseSpy();
    const sut = new RemoteLoadSurveyList(url, getDatabaseSpy);
    await sut.loadAll();
    expect(getDatabaseSpy.url).toBe(url);
  });
});
