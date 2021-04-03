import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ZFormInputBase, ZFormInputText } from '../form-inputs';
import { ZFormService } from '../z-form.service';

@Component({
  selector: 'z-input-material',
  templateUrl: './z-input-material.component.html',
  styleUrls: ['./z-input-material.component.scss']
})
export class ZInputMaterialComponent implements OnInit {

  @Input() input: ZFormInputBase<any>;
  @Input() form: FormGroup;

  public errorKeys: string[] = [];

  constructor(private formService: ZFormService) { }


  ngOnInit(): void {

    if (this.currentControl) {
      this.formSetup(this.currentControl);
    } else {
      this.input.didReceiveControl.subscribe((control) => {
        this.formSetup(control);
      });
    }

  }

  get currentControl(): AbstractControl {
    return this.input.currentControl;
  }

  get asInputText(): ZFormInputText { return this.input as ZFormInputText; }


  public getErrors(control: AbstractControl): string[] {
    return Object.keys(control.errors);
  }
  public formSetup(control: AbstractControl): void {

    switch (this.input.controlType) {


    }

  }

}
