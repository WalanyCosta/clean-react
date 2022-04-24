import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation } from '@/validation/validators';

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

  build (): FieldValidation[] {
    return this.fieldValidations;
  }
}
