import faker from '@faker-js/faker';
import { GetDatabaseSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { StatusCode } from '@/data/protocols/firebase';
import { SurveyModel } from '@/domain/model';
import { UnexpectedError } from '@/domain/errors';
import { mockSurveyList } from '@/domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyList,
  getDatabaseSpy: GetDatabaseSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()) : SutTypes => {
  const getDatabaseSpy = new GetDatabaseSpy<SurveyModel[]>();
  getDatabaseSpy.response = {
    statusCode: StatusCode.ok
  };
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

  test('should throw UnexpectedError GetDatabase returns error', async () => {
    const { sut, getDatabaseSpy } = makeSut();
    getDatabaseSpy.response = {
      statusCode: StatusCode.serverError
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a list of SurveyModel if GetDatabase do not return error', async () => {
    const { sut, getDatabaseSpy } = makeSut();
    const response = mockSurveyList();
    getDatabaseSpy.response = {
      statusCode: StatusCode.ok,
      body: response
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toBe(response);
  });
});
