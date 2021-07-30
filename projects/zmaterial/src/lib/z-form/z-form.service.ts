import {
  zCfpValidator,
  zCnpjPattern,
  zCnpjValidar,
  zCpfCnpjPattern,
  zCpfPattern,
  zIpPattern,
  zSelectValidator,
  zTimePatternNoSeconds,
  zTimePatternSeconds,
  zVehiclePlatePattern
} from './validators';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  ZFormInputBase,
  ZFormInputText,
  ZFormInputSelect,
  ZFormInputTime,
  ZFormInputArray,
  ZInput
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

    if (input.controlType === 'inputTime') {
      if (!(input as ZFormInputTime).isSeconds) {
        validators.push(Validators.pattern(zTimePatternSeconds));
      } else {
        validators.push(Validators.pattern(zTimePatternNoSeconds));
      }
    }

    if (input.controlType === 'inputSelect') {
      asyncValidators.push(zSelectValidator((input as ZFormInputSelect<any, any>)));
    }

    let control: AbstractControl;

    if (input.controlType === 'zformArray') {
      const ctr = input as ZFormInputArray<any, ZFormInputBase<any>, ZInput<any>>;

      const startRows = Math.max(ctr.startItens, (ctr.value || []).length);
      // Precisa criar os validadores do Array
      const controls = Array(startRows).fill(1).map((v, idx) => {

        const newQ = new ctr.controlConstructor({
          ...ctr.controlOptions,
          value: (ctr.value || [])[idx] || ctr.controlOptions.value,
          key: String(idx)
        });
        ctr.questions.push(newQ); // Guarda as questoes na memoria do ArrQuestion para uso posterior
        const genControl = this.inputControl(newQ);
        return genControl;
      });

      control = new FormArray(controls, [...validators, ...input.validators], [...asyncValidators, ...input.asyncValidators]);
    } else {

      control = new FormControl({
        value: input.value === undefined ? '' : input.value,
        disabled: input.disabled
      }, [...validators, ...input.validators], [...asyncValidators, ...input.asyncValidators]);

    }

    input.didReceiveControl.next(control as FormControl);

    return control;

  }
}
