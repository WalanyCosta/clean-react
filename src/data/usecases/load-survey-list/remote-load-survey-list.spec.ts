import faker from '@faker-js/faker';
import { GetDatabaseSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList,
  getDatabaseSpy: GetDatabaseSpy
}

const makeSut = (url = faker.internet.url()) : SutTypes => {
  const getDatabaseSpy = new GetDatabaseSpy();
  const sut = new RemoteLoadSurveyList(url, getDatabaseSpy);
  return {
    sut,
    getDatabaseSpy
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call GetDatabase with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, getDatabaseSpy } = makeSut(url);
    await sut.loadAll();
    expect(getDatabaseSpy.url).toBe(url);
  });
});
