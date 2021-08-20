import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputNumber extends ZFormInputBase<number> {

  public controlType = 'inputNumber';
  public min?: number;
  public max?: number;
  public step?: number;

  constructor(options: ZInputNumber) {
    super(options);
    this.min = options.min;
    this.max = options.max;
    this.step = options.step || 1;
  }

}

export interface ZInputNumber extends ZInput<number> {
  min?: number;
  max?: number;
  step?: number;
}
