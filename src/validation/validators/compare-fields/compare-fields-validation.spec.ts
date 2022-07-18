import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { CompareFIeldValidation } from './compare-fields-validation';

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = new CompareFIeldValidation(
      faker.database.column(),
      faker.random.word()
    );
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = new CompareFIeldValidation(
      faker.database.column(),
      valueToCompare
    );
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
