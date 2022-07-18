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
});
