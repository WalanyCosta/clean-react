import { HttpPostParams } from '@/data/protocols/http';
import faker from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
  data: faker.random.words(8),
  status: faker.finance.account(3)
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: { passWord: faker.internet.password(), email: faker.internet.email() }
});

describe('AxiosHttpClient', () => {
  test('should calls axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const response = await sut.post(mockPostRequest());
    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    });
  });
});
