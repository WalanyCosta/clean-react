import faker from '@faker-js/faker';
import { GetDatabaseSpy, mockRemoteSurveyList } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { StatusCode } from '@/data/protocols/firebase';
import { SurveyModel } from '@/domain/model';
import { UnexpectedError } from '@/domain/errors';
import { mockSurveyList } from '@/domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyList,
  getDatabaseSpy: GetDatabaseSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()) : SutTypes => {
  const getDatabaseSpy = new GetDatabaseSpy<RemoteLoadSurveyList.Model[]>();
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
    const response = mockRemoteSurveyList();
    getDatabaseSpy.response = {
      statusCode: StatusCode.ok,
      body: response
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([{
      id: response[0].id,
      question: response[0].question,
      answers: response[0].answers,
      date: new Date(response[0].date),
      didAnswer: response[0].didAnswer
    },
    {
      id: response[1].id,
      question: response[1].question,
      answers: response[1].answers,
      date: new Date(response[1].date),
      didAnswer: response[1].didAnswer
    },
    {
      id: response[2].id,
      question: response[2].question,
      answers: response[2].answers,
      date: new Date(response[2].date),
      didAnswer: response[2].didAnswer
    }]);
  });

  test('should return a list of SurveyModel if GetDatabase returns 204', async () => {
    const { sut, getDatabaseSpy } = makeSut();
    getDatabaseSpy.response = {
      statusCode: StatusCode.noContent
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
