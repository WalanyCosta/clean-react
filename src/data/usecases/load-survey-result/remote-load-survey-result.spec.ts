import { GetDatabaseSpy } from '@/data/test';
import faker from '@faker-js/faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

type SutTypes = {
  sut: RemoteLoadSurveyResult,
  getDatabaseSpy: GetDatabaseSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const getDatabaseSpy = new GetDatabaseSpy();
  const sut = new RemoteLoadSurveyResult(getDatabaseSpy, url);
  return {
    sut,
    getDatabaseSpy
  };
};

describe('RemoteLoadSurveyResult', () => {
  test('should call GetDatabase with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, getDatabaseSpy } = makeSut(url);
    await sut.load();
    expect(getDatabaseSpy.url).toBe(url);
  });
});
