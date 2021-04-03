import { ElementRef, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ZSearchResult } from '../interfaces';
import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputSelect<X, Y> extends ZFormInputBase<X> {
  public controlType = 'inputSelect';

  public valueProperty?: string;
  public initialObject?: Y;
  public maxItems: number;
  public debounceTime?: number;
  public typeWhileSerching: boolean;
  public customOptionTemplate?: TemplateRef<ElementRef>;

  public searchItens: (value: string, numberOfItens: number) => Observable<ZSearchResult<Y>>;
  public getSingleItem?: (value: any) => Observable<Y>;
  public displayImageSelect: (element: Y) => string;
  public firstDisplaySelect: (element: Y) => string;
  public secondaryDisplaySelect?: (element: Y) => string;

  constructor(input: ZInputSelect<X, Y>) {
    super(input);

    this.valueProperty = input.valueProperty;
    this.initialObject = input.initialObject;

    this.searchItens = input.searchItens;
    this.getSingleItem = input.getSingleItem;
    this.firstDisplaySelect = input.firstDisplaySelect;
    this.secondaryDisplaySelect = input.secondaryDisplaySelect;
    this.displayImageSelect = input.displayImageSelect;

    this.customOptionTemplate = input.customOptionTemplate;
    this.debounceTime = input.debounceTime;
    this.typeWhileSerching = input.typeWhileSerching;
    this.maxItems = input.maxItens || 15;
  }
}

export interface ZInputSelect<X, Y> extends ZInput<X> {
  valueProperty?: string;
  maxItens?: number;
  debounceTime?: number;
  typeWhileSerching?: boolean;
  initialObject?: Y;
  customOptionTemplate?: TemplateRef<ElementRef>;

  searchItens: (value: string, numberOfItens: number) => Observable<ZSearchResult<Y>>;
  getSingleItem?: (value: any) => Observable<Y>;
  displayImageSelect?: (element: Y) => string;
  firstDisplaySelect: (element: Y) => string;
  secondaryDisplaySelect?: (element: Y) => string;
}
