import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputTime extends ZFormInputBase<string> {

  public controlType = 'inputTime';
  public isSeconds: boolean;

  constructor(options: ZInputTime) {
    super(options);
    this.isSeconds = options.isSeconds || false;
  }

}

export interface ZInputTime extends ZInput<string> {
  isSeconds?: boolean;
}
