import { HttpPostClient } from './../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: String;

  async post (url: String): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}
