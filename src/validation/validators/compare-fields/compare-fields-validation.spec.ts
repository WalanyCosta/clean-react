import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { CompareFieldValidation } from './compare-fields-validation';

const makeSut = (field, fieldToCompare): CompareFieldValidation => {
  return new CompareFieldValidation(field, fieldToCompare);
};

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const value = faker.random.word();
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    });
    expect(error).toBeFalsy();
  });
});
