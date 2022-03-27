import { AuthenticationParams, Authentication } from '@/domain/usecases/Authentication';
import { HttpPostClient, HttpPostParams, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';

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
