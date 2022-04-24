import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

const makeSut = ():MinLengthValidation => new MinLengthValidation('field', 5);

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
