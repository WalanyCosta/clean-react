import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation } from '@/validation/validators';
import { EmailValidation } from '../email/email-validation';

export class ValidationBuilder {
  private constructor (
    private readonly field: string,
    private fieldValidations: FieldValidation[]
  ) {}

  static field (field: string): ValidationBuilder {
    return new ValidationBuilder(field, []);
  }

  required (): ValidationBuilder {
    this.fieldValidations.push(new RequiredFieldValidation(this.field));
    return this;
  }

  email (): ValidationBuilder {
    this.fieldValidations.push(new EmailValidation(this.field));
    return this;
  }

  build (): FieldValidation[] {
    return this.fieldValidations;
  }
}
