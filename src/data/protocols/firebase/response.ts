export enum StatusCode {
  ok = 200,
  unauthorized = 'auth/wrong-password',
  unauthorizedUser = 'auth/user-not-found',
  badRequest = 400,
  notFound = 404,
  serverError = 500
}

export type Response <R> = {
  statusCode: StatusCode;
  body?: R;
}
