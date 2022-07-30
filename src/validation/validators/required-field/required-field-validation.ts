import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {
    this.field = field;
  }

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
