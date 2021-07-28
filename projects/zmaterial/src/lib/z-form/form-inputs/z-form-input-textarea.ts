import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputTextArea extends ZFormInputBase<string> {

  public controlType = 'inputTextArea';
  public maxLength?: number;
  public minLength?: number;
  public rows?: number;

  constructor(options: ZInputTextArea) {
    super(options);
    this.maxLength = options.maxLength;
    this.minLength = options.minLength;
    this.rows = options.rows;
  }

}

export interface ZInputTextArea extends ZInput<string> {
  maxLength?: number;
  minLength?: number;
  rows?: number;
}
