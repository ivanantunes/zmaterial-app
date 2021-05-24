import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ZTranslateService } from '../services';
import { ZModalService } from '../z-modal';
import { ZReportSource } from './class';

enum ReportBuilderTab {
  filter,
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

  // ? Global
  public loading = false;
  public selectedTab = ReportBuilderTab.filter;

  // ? Form
  public formFilter: FormGroup = new FormGroup({});

  constructor(
    private modal: ZModalService,
    private tService: ZTranslateService
  ) {}

  ngOnInit(): void {
    if (!this.screen) {

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
    this.loading = true;

    this.source.getFilteredReportData(this.screen, value).subscribe((data) => {
      this.source.setReportData(data);
      this.source.metadata.reportHeader.filters = this.source.metadata.form.inputs.map((field) => {

        if (field.relation) {
          return {
            title: field.label,
            value: value[field.key][field.relation.fieldDescription]
          };
        }

        return {
          title: field.label,
          value: value[field.key]
        };

      });
      this.selectedTab = ReportBuilderTab.report;

      this.loading = false;

    }, (err) => {

      this.loading = false;

      this.modal.zModalTError({
        title: this.tService.t('lbl_error'),
        description: this.tService.t('mdl_fail_generate_report'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    });


  }

}
