export class InvalidFieldError extends Error {
  constructor () {
    super('value não valido');
    this.name = 'InvalidFieldError';
  }
}
