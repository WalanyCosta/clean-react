import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { EmailValidation } from './email-validation';

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new EmailValidation(faker.random.word());
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if email is valid', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
