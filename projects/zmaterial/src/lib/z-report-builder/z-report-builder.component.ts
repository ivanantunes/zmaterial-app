import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ZTranslateService } from '../services';
import { ZModalService } from '../z-modal';
import { ZReportSource } from './class';
import { MatSelectionList } from '@angular/material/list';
import { ZReportField, ZReportMetadata } from './interfaces';

enum ReportBuilderTab {
  filter,
  choose,
  report
}

@Component({
  selector: 'z-report-builder',
  templateUrl: './z-report-builder.component.html',
  styleUrls: ['./z-report-builder.component.scss']
})
export class ZReportBuilderComponent implements OnInit {

  // ? Data Input
  @Input() source: ZReportSource;
  @Input() screen: string;

  // ? DOM
  @ViewChild('fields') fields: MatSelectionList;

  // ? Global
  public loading = false;
  public selectedTab = ReportBuilderTab.filter;
  public metadataField: ZReportField[];

  // ? Form
  public formFilter: FormGroup = new FormGroup({});

  constructor(
    private modal: ZModalService,
    private tService: ZTranslateService
  ) {}

  ngOnInit(): void {
    if (!this.screen || !this.source) {

      this.modal.zModalTError({
        title: this.tService.t('lbl_error'),
        description: this.tService.t('mdl_fail_screen'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    }

    if (this.source !== null) {
      this.refresh();
    }

  }

  private refresh(): void {
    this.loading = true;

    this.source.getMetadata(this.screen).subscribe((metadata) => {
      this.source.metadata = metadata;
      this.metadataField = metadata.fields;

      this.loading = false;
    }, (error) => {
      console.log('Falha ao Atualizar: ', error);

      this.loading = false;

      this.modal.zModalTError({
        title: this.tService.t('lbl_error'),
        description: this.tService.t('mdl_fail_refresh'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    });
  }

  public didChangeTab(newTab: number): void {
    this.selectedTab = newTab;
  }

  public submitFilter(value: any): void {
    this.selectedTab = ReportBuilderTab.choose;
  }

  public choiceFields(): void {
    const arrFields = this.fields.selectedOptions.selected.map((f) => f.value);

    this.source.getFilteredReportData(this.screen, this.formFilter.value).pipe(
      map((data) => data.map((row) => {
        const newObject: any = {};

        arrFields.forEach((f) => {

          newObject[f.key] = row[f.key];

        });

        return newObject;

      })),
    ).subscribe((data) => {
      this.source.setReportData(data);
      this.source.metadata.reportHeader.filters = this.source.metadata.form.inputs.map((field) => {

        if (field.relation) {
          return {
            title: field.label,
            value: this.formFilter.value[field.key][field.relation.fieldDescription]
          };
        }

        return {
          title: field.label,
          value: this.formFilter.value[field.key]
        };

      });
      this.source.metadata.fields = arrFields;

      this.selectedTab = ReportBuilderTab.report;

    }, (err) => {

      this.modal.zModalTError({
        title: this.tService.t('lbl_error'),
        description: this.tService.t('mdl_fail_generate_report'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    });

  }

}
