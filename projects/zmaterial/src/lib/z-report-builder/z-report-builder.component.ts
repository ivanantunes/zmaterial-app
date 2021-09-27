import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ZTranslateService } from '../services';
import { ZModalService } from '../z-modal';
import { ZReportSource } from './class';
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
  @Input() checks: ZReportField[];

  // ? DOM
  // @ViewChild('fields') fields: MatSelectionList;

  // ? Global
  public loading = false;
  public selectedTab = ReportBuilderTab.filter;
  public metadata: ZReportMetadata;
  public choicesArray: FormArray;

  // ? Form
  public formFilter: FormGroup = new FormGroup({});
  public formGroupFields: FormGroup;

  // ? Backup
  private reportMetadataBackup: ZReportField[] = [];

  constructor(
    private modal: ZModalService,
    private tService: ZTranslateService,
    private fb: FormBuilder,
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
      this.checks = metadata.fields;

      this.formGroupFields = this.fb.group({
        myChoices: new FormArray([])
      });

      this.choicesArray = this.formGroupFields.get('myChoices') as FormArray;

      this.checks.forEach((choice) => {
        choice.checked = choice.required;
        choice.grouped = false;
        this.choicesArray.push(new FormControl(choice));
      });

      metadata.fields.forEach((f) => this.reportMetadataBackup.push(f));

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

    const checkedOnes = this.checks.filter((f) => f.checked);


    // const arrFields = this.fields.selectedOptions.selected.map((f) => f.value);

    this.source.getFilteredReportData(this.screen, this.formFilter.value).pipe(
      map((data) => data.map((row) => {
        const newObject: any = {};

        checkedOnes.forEach((f) => {

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
      this.source.metadata.fields = checkedOnes;

      this.selectedTab = ReportBuilderTab.report;

    }, (err) => {

      this.modal.zModalTError({
        title: this.tService.t('lbl_error'),
        description: this.tService.t('mdl_fail_generate_report'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    });

  }

  public onSendFields(): void {

    if (!this.screen) {
      return;
    }

    if (this.choicesArray.value.length < 2) {
      return;
    }

    this.selectedTab = ReportBuilderTab.report;
  }

  public onGroupChange(event): void {
    const campo = event.source.value;
    const campos = this.checks.filter((f) => f !== campo);

    if (!campo.grouped) {
      // * No no. just one at a time
      campos.forEach((c) => (c.grouped = false));
    }

    const index = this.checks.indexOf(campo);
    campo.grouped = !campo.grouped;
    this.checks[index] = campo;
  }

  public onSimplifiedChange(event): void {
    if (event.checked) {
      this.checks.forEach((c) => (c.grouped = false));
    }
  }

  public getCheckedFields(): boolean {
    return this.checks.filter((c) => c.checked).length < 2;
  }

  public onCheckChange(event): void {

    const campo = event.source.value;

    const index = this.checks.indexOf(campo);
    campo.checked = !campo.checked;
    campo.grouped = false;
    this.checks[index] = campo;

  }

  private generateFieldsArray(choices: ZReportField[], reportMetadata: ZReportField[]): boolean {
    const fieldsArray = [];

    choices.forEach((c) => {
      reportMetadata.forEach((f) => {
        if (c.key === f.key) {
          fieldsArray.push(c);
        }
      });
    });

    if (fieldsArray.length < 2) {
      return false;
    }

    /* Ordenar os campos do relatório */
    fieldsArray.sort((a: ZReportField, b: ZReportField) => {
      if (a.order < b.order) { return -1; }
      if (a.order > b.order) { return 1; }
    });

    this.source.metadata.fields = fieldsArray;
    this.metadata.fields = fieldsArray;

    return true;
  }

}
