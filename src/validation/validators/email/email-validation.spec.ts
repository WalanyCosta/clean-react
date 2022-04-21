import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});
