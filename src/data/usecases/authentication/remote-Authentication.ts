import { AuthenticationParams } from '@/domain/usecases/Authentication';
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

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

    const response = await this.httpPostClient.post({
      url: this.url,
      body: newObject
    } as HttpPostParams);

    switch (response.statusCode) {
      case HttpStatusCode.ok : break;
      case HttpStatusCode.unathorized:throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
