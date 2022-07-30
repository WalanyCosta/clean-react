import { FieldValidation } from '@/validation/protocols/field-validation';
import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {
    this.field = field;
  }

  validate (input: object) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidFieldError();
  }
}
