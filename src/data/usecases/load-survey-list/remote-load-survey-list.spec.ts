import faker from '@faker-js/faker';
import { GetDatabaseSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { StatusCode } from '@/data/protocols/firebase';
import { SurveyModel } from '@/domain/model';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyList,
  getDatabaseSpy: GetDatabaseSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()) : SutTypes => {
  const getDatabaseSpy = new GetDatabaseSpy<SurveyModel[]>();
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

  test('should throw UnexpectedError GetDatabase return error', async () => {
    const { sut, getDatabaseSpy } = makeSut();
    getDatabaseSpy.response = {
      statusCode: StatusCode.serverError
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
