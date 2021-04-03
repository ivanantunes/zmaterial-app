import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputText extends ZFormInputBase<string> {
  public controlType = 'inputText';
  public type: string;
  public maxlength?: number;
  public minlength?: number;
  public mask: string;
  public preFix?: string;

  constructor(input: ZInputText) {
    super(input);
    this.type = input.type;
    this.maxlength = input.maxlength;
    this.minlength = input.minlength;
    this.preFix = input.preFix;

    switch (input.type) {
      case 'ip':
        this.mask = 'IP';
        break;
      case 'CPF':
        this.mask = '000.000.000-00';
        break;
      case 'CNPJ':
        this.mask = '00.000.000/0000-00';
        break;
    }
  }

}

export interface ZInputText extends ZInput<string> {
  type: 'email' | 'password' | 'text' | 'ip' | 'CPF' | 'CNPJ' | 'CPF/CNPJ' | 'vehiclePlate' ;
  maxlength?: number;
  minlength?: number;
  preFix?: string;
}
