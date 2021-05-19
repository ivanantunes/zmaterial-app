import { ZReportModule } from './../z-report/z-report.module';
import { ZFormModule } from './../z-form/z-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZReportBuilderComponent } from './z-report-builder.component';
import { ZModule } from '../z.module';

@NgModule({
  declarations: [
    ZReportBuilderComponent
  ],
  imports: [
    CommonModule,
    // Module Global
    ZModule,
    ZFormModule,
    ZReportModule
  ],
  exports: [
    ZReportBuilderComponent
  ]
})
export class ZReportBuilderModule { }
