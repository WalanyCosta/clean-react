import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { CompareFieldValidation } from './compare-fields-validation';

const makeSut = (valueToCompare): CompareFieldValidation => {
  return new CompareFieldValidation(faker.database.column(), valueToCompare);
};

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
