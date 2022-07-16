export class EmailInUseError extends Error {
  constructor () {
    super('Já este existe Email');
    this.name = 'EmailInUseError';
  }
}
