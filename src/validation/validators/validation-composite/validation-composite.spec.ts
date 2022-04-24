import { FieldValidationSpy } from '@/validation/test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('any_field');
    const fieldValidationSpy2 = new FieldValidationSpy('any_field');
    fieldValidationSpy2.error = new Error('any_mensagem');
    const sut = new ValidationComposite([fieldValidationSpy1, fieldValidationSpy2]);
    const errorMessage = sut.validate('any_field', 'any_value');
    expect(errorMessage).toBe('any_mensagem');
  });
});
