export class InvalidCredentialsError extends Error {
  constructor () {
    super('credencias inválidas');
    this.name = 'InvalidCredentialsError';
  }
}
