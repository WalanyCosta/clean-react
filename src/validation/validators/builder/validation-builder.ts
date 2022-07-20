import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation, CompareFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators';
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

  min (minLength: number): ValidationBuilder {
    this.fieldValidations.push(new MinLengthValidation(this.field, minLength));
    return this;
  }

  toCompare (value: string): ValidationBuilder {
    this.fieldValidations.push(new CompareFieldValidation(this.field, value));
    return this;
  }

  build (): FieldValidation[] {
    return this.fieldValidations;
  }
}
