import { FieldValidation } from '@/validation/protocols/field-validation';
import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {
    this.field = field;
  }

  validate (value: string) {
    return new InvalidFieldError();
  }
}
