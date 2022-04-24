import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('password', 5);
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError());
  });
});
