import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZModule } from '../z.module';
import { ZReportMaterialComponent } from './z-report-material';

@NgModule({
    declarations: [
        ZReportMaterialComponent,
    ],
    imports: [
        CommonModule,
        // Module Global
        ZModule
    ],
    exports: [
      ZReportMaterialComponent,
    ],
})
export class ZReportModule { }
