import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ZFormInputBase } from '../form-inputs';

export abstract class ZFormProvider {

  /**
   * Event Reset Form
   */
  public didResetForm = new EventEmitter();

  /**
   * Event Set Value Form
   */
  public didSetValueForm = new EventEmitter<any>();

  /**
   * Function Set Value Form and Emit Event.
   * @param value New Value Seto to Form.
   */
  public setValueForm(value: any): void {
    this.didSetValueForm.emit(value);
  }

  /**
   * Function Reset Form and Emit Event.
   */
  public resetForm(): void {
    this.didResetForm.emit();
  }

  public abstract getInputs(): Observable<ZFormInputBase<any>[]>;
}
