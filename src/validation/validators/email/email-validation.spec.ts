import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { EmailValidation } from './email-validation';

const makeSut = () : EmailValidation => new EmailValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
