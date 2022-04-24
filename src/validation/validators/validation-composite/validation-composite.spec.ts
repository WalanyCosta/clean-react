import { FieldValidationSpy } from '@/validation/test/mock-field-validation';
import faker from '@faker-js/faker';
import { ValidationComposite } from './validation-composite';

type SutTypes ={
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (field: string) :SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy
  };
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const firstMessage = faker.random.words();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    fieldValidationsSpy[0].error = new Error(firstMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const errorMessage = sut.validate(fieldName, faker.random.word());
    expect(errorMessage).toBe(firstMessage);
  });

  test('should return falsy if validation not fails', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const errorMessage = sut.validate(fieldName, faker.random.word());
    expect(errorMessage).toBeFalsy();
  });
});
