import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: String;

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
