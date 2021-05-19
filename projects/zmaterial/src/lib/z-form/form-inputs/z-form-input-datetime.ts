import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputDateTime extends ZFormInputBase<any> {

  controlType = 'dateTime';
  minDate?: Date;
  maxDate?: Date;

  constructor(input: ZInputDateTime) {
    super(input);
    this.minDate = input.minDate;
    this.maxDate = input.maxDate;
  }

}

export interface ZInputDateTime extends ZInput<any> {
  minDate?: Date;
  maxDate?: Date;
}
