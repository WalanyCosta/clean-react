import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string) {
    this.field = field;
  }

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null;
  }
}
