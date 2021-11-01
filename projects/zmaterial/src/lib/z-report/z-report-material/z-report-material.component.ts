import { ZTranslateService } from '../../services/z-translate.service';
import { ZReportConfig } from './../interfaces/z-report-config';
import { Component, Input, OnInit } from '@angular/core';
import { ZReportProvider } from '../providers';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ZModalService } from '../../z-modal';
import { ZReportDefinition } from '../interfaces';
import { zPdfGenerator, zXlsxGenerator, zCsvGenerator } from '../functions';
import { ZReportField } from '../../z-report-builder/interfaces';
import { ZReportSource } from '../../z-report-builder/class/zReportSource';

@Component({
  selector: 'z-report-material',
  templateUrl: './z-report-material.component.html',
  styleUrls: ['./z-report-material.component.scss']
})
export class ZReportMaterialComponent implements OnInit {

  @Input() reportProvider: ZReportProvider<any>;
  @Input() reportSource: ZReportSource;
  @Input() checks: ZReportField[];

  public dataSource: any[];
  public dateGenerateReport = new Date().toLocaleString();
  public filteringByLabel: string;
  public filteringBy: string;
  public groupedField: ZReportField[] = [];
  public actuallyDataSource: any[] = [];

  constructor(private modal: ZModalService, private tService: ZTranslateService) { }

  get getReportDefinition(): ZReportDefinition<any>[] {
    if (!this.reportProvider) {
      return [];
    }

    return this.reportProvider.getReportDefinition().sort((a, b) => a.order - b.order);
  }

  get getReportColumns(): string[] {
    return this.getReportDefinition.map(c => c.key);
  }

  get getReportConfig(): ZReportConfig {

    if (!this.reportProvider) {
      return null;
    }

    return this.reportProvider.getReportConfig();
  }

  ngOnInit(): void {

    this.reportProvider.getReportData().pipe(
      catchError((err) => {
        console.log('Falha ao Setar Valor: ', err);
        this.modal.zModalTError({
          title: this.tService.t('lbl_error'),
          description: this.tService.t('mdl_fail_set_values'),
          btnCloseTitle: this.tService.t('btn_close'),
          isDisableClose: true
        });
        return of([]);
      })
    ).subscribe((data) => {
      const isGrouped = this.checks.find((f) => f.grouped);

      this.dataSource = data;
      this.groupedField = this.checks.filter((f) => f.grouped);
      this.filteringByLabel = isGrouped ? isGrouped.label : '';

      const segregatedData = [];

      if (this.groupedField.length === 1) {

        this.groupedField.forEach((f) => {
          const obj = this.groupBy2(data, f.key);

          Object.keys(obj).forEach(key => {
            const array: any[] = Object.keys(obj[key]).map(item => obj[key][item]);
            segregatedData.push(array);
          });
        });

        this.filteringBy = this.groupedField[0].key;
        this.filteringByLabel = this.groupedField[0].label;
      }

      this.actuallyDataSource = segregatedData;


    });

  }

  public exportPDF(): void {
    zPdfGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource, this.tService, this.checks);
  }

  public exportXLSX(): void {
    zXlsxGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource, this.tService);
  }

  public exportCSV(): void {
    zCsvGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource, this.tService);
  }

  public groupBy2(xs: any[], prop: string): any {
    const grouped = {};
    for (const x of xs) {
      const p = x[prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(x);
    }
    return grouped;
  }
}
