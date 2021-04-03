import {
  zCfpValidator,
  zCnpjPattern,
  zCnpjValidar,
  zCpfCnpjPattern,
  zCpfPattern,
  zIpPattern,
  zSelectValidator,
  zVehiclePlatePattern
} from './validators';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  ZFormInputBase,
  ZFormInputText,
  ZFormInputSelect
} from './form-inputs';

@Injectable({
  providedIn: 'root'
})
export class ZFormService {

  constructor() { }

  public getFormGroup(formInputs: ZFormInputBase<any>[]): FormGroup {

    const currentGroup = formInputs.reduce<{ [key: string]: AbstractControl; }>((group, input, idx, arr) => {
      group[input.key] = this.inputControl(input);
      return group;
    }, {});

    return new FormGroup(currentGroup);
  }

  public inputControl(input: ZFormInputBase<any>): AbstractControl {

    const validators: ValidatorFn[] = [];
    const asyncValidators: AsyncValidatorFn[] = [];

    if (input.required) {
      validators.push(Validators.required);
    }

    if (input.controlType === 'inputText') {

      if ((input as ZFormInputText).type) {
        validators.push(Validators.minLength((input as ZFormInputText).minlength));
      }

      switch ((input as ZFormInputText).type) {
        case 'email':
          validators.push(Validators.email);
          break;
        case 'ip':
          validators.push(Validators.pattern(zIpPattern));
          break;
        case 'vehiclePlate':
          validators.push(Validators.pattern(zVehiclePlatePattern));
          break;
        case 'CPF':
          validators.push(Validators.pattern(zCpfPattern));
          validators.push(zCfpValidator);
          break;
        case 'CNPJ':
          validators.push(Validators.pattern(zCnpjPattern));
          validators.push(zCnpjValidar);
          break;
        case 'CPF/CNPJ':
          validators.push(Validators.pattern(zCpfCnpjPattern));
          break;
      }
    }

    if (input.controlType === 'inputSelect') {
      asyncValidators.push(zSelectValidator((input as ZFormInputSelect<any, any>)));
    }

    const control = new FormControl({
      value: input.value === undefined ? '' : input.value,
      disabled: input.disabled
    }, [...validators, ...input.validators], [...asyncValidators, ...input.asyncValidators]);

    input.didReceiveControl.next(control);

    return control;
  }
}
