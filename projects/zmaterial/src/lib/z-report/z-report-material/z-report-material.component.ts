import { ZReportConfig } from './../interfaces/z-report-config';
import { Component, Input, OnInit } from '@angular/core';
import { ZReportProvider } from '../providers';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ZModalService } from '../../z-modal';
import { ZReportDefinition } from '../interfaces';
import { zPdfGenerator, zXlsxGenerator, zCsvGenerator } from '../functions';

@Component({
  selector: 'z-report-material',
  templateUrl: './z-report-material.component.html',
  styleUrls: ['./z-report-material.component.scss']
})
export class ZReportMaterialComponent implements OnInit {

  @Input() reportProvider: ZReportProvider<any>;

  public dataSource: any[];
  public dateGenerateReport = new Date().toLocaleString();

  constructor(private modal: ZModalService) { }

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
          title: 'Erro',
          description: 'Falha ao Setar Valores',
          btnCloseTitle: 'Fechar',
          isDisableClose: true
        });
        return of([]);
      })
    ).subscribe((data) => {
      this.dataSource = data;
    });

  }

  public exportPDF(): void {
    zPdfGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource);
  }

  public exportXLSX(): void {
    zXlsxGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource);
  }

  public exportCSV(): void {
    zCsvGenerator(this.getReportConfig, this.getReportDefinition, this.dataSource);
  }
}
