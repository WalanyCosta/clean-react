import { FieldValidationSpy } from '@/validation/test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTypes ={
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = ():SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy
  };
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    fieldValidationsSpy[0].error = new Error('first_any_mensagem');
    fieldValidationsSpy[1].error = new Error('second_any_mensagem');
    const errorMessage = sut.validate('any_field', 'any_value');
    expect(errorMessage).toBe('first_any_mensagem');
  });
});
