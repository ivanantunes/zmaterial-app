import { ZFormInputBase } from './../form-inputs';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ZFormService } from './../z-form.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ZFormProvider } from '../providers';

@Component({
  selector: 'z-form-material',
  templateUrl: './z-form-material.component.html',
  styleUrls: ['./z-form-material.component.scss']
})
export class ZFormMaterialComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() formProvider: ZFormProvider;
  @Input() showClearButton: boolean;
  @Input() showLoading: boolean;
  @Input() submitText: string;
  @Input() hideHeaderForm: boolean;

  @Output() submitValue = new Subject<any>();
  @Output() formReady = new Subject<FormGroup>();

  public formInputs: ZFormInputBase<any>[] = [];
  public defaultValues: any = {};
  public form: FormGroup;

  constructor(private formService: ZFormService) { }

  ngOnInit(): void {

    if (this.formProvider) {

      this.formProvider.getInputs().subscribe((inputs) => {

        this.formInputs = inputs.sort((a, b) => a.order - b.order);

        this.form = this.formService.getFormGroup(this.formInputs);

        this.formReady.next(this.form);

        this.defaultValues = this.form.value;

        this.formProvider.didSetValueForm.subscribe((value) => {
          this.form.setValue(value);
        });

        this.formProvider.didResetForm.subscribe(() => {
          this.form.reset();
          this.form.setValue(this.defaultValues);
        });

      });

    }

  }

  public sendValue(): void {
    this.submitValue.next(this.form.value);
  }

  public reset(event: Event): void {
    event.stopPropagation();
    this.formProvider.resetForm();
  }

}
