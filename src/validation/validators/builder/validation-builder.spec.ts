import faker from '@faker-js/faker';
import { RequiredFieldValidation, EmailValidation, MinLengthValidation, CompareFieldValidation } from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should returns RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('should returns EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('should returns MinLengthValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();
    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  test('should returns CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = ValidationBuilder.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([new CompareFieldValidation(field, fieldToCompare)]);
  });

  test('should returns List', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.random.word();
    const validations = ValidationBuilder.field(field).required().email().min(5).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5),
      new CompareFieldValidation(field, fieldToCompare)
    ]);
  });
});
