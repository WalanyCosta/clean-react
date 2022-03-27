import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '../protocols/http';

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
