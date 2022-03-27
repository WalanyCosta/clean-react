import { AuthenticationParams, Authentication } from '@/domain/usecases/Authentication';
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/model/Account-model';

export class RemoteAuthentication implements Authentication {
  constructor (
      private readonly url: String,
      private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async auth (params : AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params
    } as HttpPostParams<AuthenticationParams>);

    switch (response.statusCode) {
      case HttpStatusCode.ok : return response.body;
      case HttpStatusCode.unathorized:throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
