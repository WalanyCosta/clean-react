export enum StatusCode {
  ok = 200,
  unauthorized = 'auth/wrong-password',
  unauthorizedUser = 'auth/user-not-found',
  serverError = 500,
  forbidden = 401
}

export type Response <R> = {
  statusCode: StatusCode;
  body?: R;
}
