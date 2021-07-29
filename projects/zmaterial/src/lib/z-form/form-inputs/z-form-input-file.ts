import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputFile extends ZFormInputBase<string> {

  public controlType = 'inputFile';
  public accept?: string;
  public multiple?: boolean;
  public maxSize?: number;

  constructor(options: ZInputFile) {
    super(options);
    this.accept = options.accept;
    this.multiple = options.multiple;
    this.maxSize = options.maxSize;
  }

}

export interface ZInputFile extends ZInput<string> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}
