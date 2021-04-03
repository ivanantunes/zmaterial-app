import { AsyncValidatorFn, ValidatorFn, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

export class ZFormInputBase<X> {

  value: X;
  key: string;
  label: string;
  hint?: string;
  required: boolean;
  order: number;
  controlType: string;
  disabled: boolean;
  validators: ValidatorFn[];
  asyncValidators: AsyncValidatorFn[];
  layout: {
    cols: number;
    colSmall?: number;
  };
  readonly: boolean;
  icon?: string;

  public didReceiveControl = new Subject<FormControl>();

  public currentControl?: FormControl;

  constructor(input: ZInput<X>) {

    this.value = input.value;
    this.key = input.key || '';
    this.icon = input.icon;
    this.label = input.label || '';
    this.required = input.required;
    this.order = input.order === undefined ? 1 : input.order;
    this.hint = input.hint;
    this.disabled = input.disabled;
    this.validators = input.validators || [];
    this.asyncValidators = input.asyncValidators || [];
    this.readonly = input.readonly ? true : false;
    this.layout = input.layout || {cols: 100};

    this.didReceiveControl.subscribe((control) => {
      this.currentControl = control;
    });
  }

}

export interface ZInput<X> {
  value?: X;
  key?: string;
  label?: string;
  icon?: string;
  hint?: string;
  required?: boolean;
  order?: number;
  sendValueIfDisabled?: boolean;
  disabled?: boolean;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  layout?: {
    cols: number;
    colSmall?: number;
  };
  readonly?: boolean;
}
