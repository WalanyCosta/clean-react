import { AuthenticationParams } from '../../../domain/usecases/Authentication';
import { HttpPostClient, HttpPostParams } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor (
      private readonly url: String,
      private readonly httpPostClient: HttpPostClient
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async auth (params : AuthenticationParams): Promise<void> {
    const newObject: Object = {
      email: params.email,
      password: params.password
    };

    await this.httpPostClient.post({
      url: this.url,
      body: newObject
    } as HttpPostParams);
  }
}
