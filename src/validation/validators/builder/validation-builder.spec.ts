import { RequiredFieldValidation } from '@/validation/validators';
import { EmailValidation } from '../email/email-validation';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should returns required-field', () => {
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });

  test('should returns email-field', () => {
    const validations = ValidationBuilder.field('any_field').email().build();
    expect(validations).toEqual([new EmailValidation('any_field')]);
  });
});
