import { ZFormInputBase, ZInput } from './z-form-input-base';

export class ZFormInputArray<T, U extends ZFormInputBase<any>, Q extends ZInput<any>> extends ZFormInputBase<T[]> {

  public controlType = 'zformArray';

  public controlOptions: Q;
  public controlConstructor: new(options: Q) => U;

  public maxItens?: number;
  public minItens?: number;
  public startItens: number;

  public questions: ZFormInputBase<any>[] = [];

  constructor(options: ZInputArray<T, U, Q>) {
    super(options);
    this.controlOptions = options.controlOptions;
    this.controlConstructor = options.controlConstructor;

    this.maxItens = options.maxItens;
    this.minItens = options.minItens;
    this.startItens = options.startItens || 1;
  }

}

export interface ZInputArray<T, U extends ZFormInputBase<any>, Q extends ZInput<any>> extends ZInput<T[]> {
  maxItens?: number;
  minItens?: number;
  startItens?: number;

  controlOptions: Q;
  controlConstructor: new(options: Q) => U;
}
