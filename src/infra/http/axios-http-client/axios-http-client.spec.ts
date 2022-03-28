import { HttpPostParams } from '@/data/protocols/http';
import faker from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  test('should calls axios with correct URL and verb', async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url } as HttpPostParams<any>);
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
