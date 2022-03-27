export enum HttpStatusCode {
  ok = 200,
  unathorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}

export type HttpResponse <R> = {
  statusCode: HttpStatusCode;
  body?: R;
}
