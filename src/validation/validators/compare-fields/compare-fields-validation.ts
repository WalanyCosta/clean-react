import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string) {
    this.field = field;
  }

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null;
  }
}
