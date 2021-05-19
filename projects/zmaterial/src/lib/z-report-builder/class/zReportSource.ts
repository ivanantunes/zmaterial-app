import { EventEmitter } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ZTranslateService } from '../../services';
import {
  ZFormInputBase,
  ZFormProvider,
  ZInput,
  ZFormInputText,
  ZFormInputSelect,
  ZFormInputDateTime,
  ZSearchResult
} from '../../z-form';
import { ZReportProvider } from '../../z-report';
import { ZReportDefinition, ZReportConfig } from '../../z-report/interfaces';
import { ZReportFilter, ZReportMetadata } from '../interfaces';

export abstract class ZReportSource extends ZFormProvider implements ZReportProvider<any> {

  public metadata: ZReportMetadata;
  public screenChanged = new EventEmitter<string>();
  private reportData: any[] = [];

  public constructor(private tService: ZTranslateService) {
    super();
  }

  public setReportData(data: any[]): void {
    this.reportData = data;
  }

  public notifyScreenChange(newScreen: string): void {
    this.screenChanged.emit(newScreen);
  }

  public getReportDefinition(): ZReportDefinition<any>[] {

    return this.metadata.fields.map((field) => {

      return {
        key: field.key,
        header: field.label,
        order: field.order,
        cell: (row: any) => String(row[field.key])
      };

    });

  }

  public getReportConfig(): ZReportConfig {

    return this.metadata.reportHeader;

  }

  public getReportData(): Observable<any[]> {
    return of(this.reportData);

  }

  public getInputs(): Observable<ZFormInputBase<any>[]> {

    if (!this.metadata) {
      return throwError(this.tService.t('metadata_not_found'));
    }

    if (!this.metadata.form) {
      return throwError(this.tService.t('form_not_found'));
    }

    return of(this.metadata.form.inputs.map((input) => {

      const fieldBase: ZInput<any> = input;

      switch (input.inputType) {

        case 'textbox':
          return new ZFormInputText({
            ...fieldBase,
            type: input.texboxType as any,
            maxlength: input.maxlength,
            minlength: input.minlength
          });

        case 'dateTime':
          return new ZFormInputDateTime({
            ...fieldBase,
            minDate: input.minDate ? new Date(input.minDate) : undefined,
            maxDate: input.maxDate ? new Date(input.maxDate) : undefined
          });

        case 'selector':

          if (!input.relation) {
            throw new Error(this.tService.t('relation_not_found'));
          }

          return new ZFormInputSelect<number, any>({
            ...fieldBase,
            firstDisplaySelect: (value: any) => {
              return typeof value === 'object' ? String(value[input.relation.fieldDescription]) : String(value);
            },
            secondaryDisplaySelect: (value: any) => {

              if (input.relation.secondaryField) {
                return String(value[input.relation.secondaryField] || `ID: ${value[input.relation.fieldName]}`);
              } else {
                return `ID: ${value[input.relation.fieldName]}`;
              }

            },
            displayImageSelect: (value: any) => {

              return input.relation.imageField ? String(value[input.relation.imageField]) : undefined;

            },
            searchItens: (value: any, numberOfItens: number) => {

              const filter: ZReportFilter = {
                search: value ? String(value) : '',
                fieldName: input.relation.fieldName,
                fieldDescription: input.relation.fieldDescription,
                tableName: input.relation.tableName,
                maxItens: numberOfItens || 15
              };

              return this.getDataSelector(this.metadata.screen, filter);

            }
          });

        default:
          throw new Error(this.tService.t('field_type_undefined'));
      }

    }));

  }

  public abstract getMetadata(screen: string): Observable<ZReportMetadata>;

  public abstract getDataSelector(screen: string, filter: ZReportFilter): Observable<ZSearchResult<any>>;

  public abstract getFilteredReportData(screen: string, filter: any): Observable<any[]>;
}
