import { Component, Input, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, delay, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import {
  ZFormInputBase,
  ZFormInputText,
  ZFormInputSelect,
  ZFormInputDateTime,
  ZFormInputTime,
  ZFormInputTextArea
} from '../form-inputs';
import { ZSearchResult } from '../interfaces';
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
  public selectLastResult: any[] = [];
  public focusSubject = new Subject<string>();
  public getDataObs: Observable<ZSearchResult<any>>;
  public isLoading = false;

  constructor(
    private formService: ZFormService,
    private ngZone: NgZone
  ) { }


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
  get asInputSelect(): ZFormInputSelect<any, any> { return this.input as ZFormInputSelect<any, any>; }
  get asInputDateTime(): ZFormInputDateTime { return this.input as ZFormInputDateTime; }
  get asInputTime(): ZFormInputTime { return this.input as ZFormInputTime; }
  get asInputTextArea(): ZFormInputTextArea { return this.input as ZFormInputTextArea; }

  public getErrors(control: AbstractControl): string[] {
    return Object.keys(control.errors);
  }

  public formSetup(control: AbstractControl): void {

    switch (this.input.controlType) {

      case 'inputSelect':
        this.setupSelector(control);
        break;

    }

  }

  public focusChange(event: any): void {
    this.focusSubject.next(event.value);
  }

  private setupSelector(control: AbstractControl): void {

    if (this.asInputSelect.initialObject) {
      this.selectLastResult.push(this.asInputSelect.initialObject);
    }

    const currentValueChange = control.valueChanges.pipe(debounceTime(this.asInputSelect.debounceTime || 500));
    const currentFocusSubject = this.focusSubject.pipe(delay(100), map(() => undefined));

    this.getDataObs = merge(currentValueChange, currentFocusSubject).pipe(
        filter(val => typeof val === 'string' || !val),
        tap(() => this.isLoading = true),
        switchMap((value: string) => this.asInputSelect.searchItens(value ? value.trim() : value, this.asInputSelect.maxItems)),
        tap((res) => {
          this.selectLastResult = res.items;
          this.isLoading = false;
        }),
        finalize(() => this.isLoading = false)
      );
  }

  public selectDisplay(val: any): string {
    if (!val) {
      return '';
    }

    let objToDisplay: any;

    if (this.asInputSelect.valueProperty) {
      objToDisplay = this.selectLastResult.find(r => r[this.asInputSelect.valueProperty] === val);
    } else if (typeof val === 'object') {
      objToDisplay = val;
    }

    if (objToDisplay) {
      return this.asInputSelect.firstDisplaySelect(objToDisplay);
    }

    return `${val}`;
  }

}

