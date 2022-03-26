import { HttpPostClient } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor (
      private readonly url: String,
      private readonly httpPostClient: HttpPostClient
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async auth (): Promise<void> {
    this.httpPostClient.post(this.url);
  }
}
