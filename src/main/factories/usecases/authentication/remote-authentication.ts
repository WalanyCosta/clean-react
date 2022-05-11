import { RemoteAuthentication } from '@/data/usecases/authentication';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  return new RemoteAuthentication(url, makeAxiosHttpClient());
};
