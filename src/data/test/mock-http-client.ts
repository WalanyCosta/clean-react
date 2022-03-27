import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

export class HttpPostClientSpy<P, R> implements HttpPostClient<P, R> {
  url?: String;
  body?: P;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (param: HttpPostParams<P>): Promise<HttpResponse<R>> {
    this.url = param.url;
    this.body = param.body;
    return Promise.resolve(this.response);
  }
}
