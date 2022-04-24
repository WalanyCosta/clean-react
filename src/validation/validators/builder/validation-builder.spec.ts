import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should returns required-field', () => {
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });
});
