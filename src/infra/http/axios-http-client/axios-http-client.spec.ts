import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '@/infra/test';
import { mockPostRequest } from '@/data/test';
import axios from 'axios';

type SutType ={
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>;
}

jest.mock('axios');

const makeSut = (): SutType => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios
  };
};

describe('AxiosHttpClient', () => {
  test('should calls axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
