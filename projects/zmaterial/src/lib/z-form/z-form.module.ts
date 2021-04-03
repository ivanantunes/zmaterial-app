import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZModule } from '../z.module';
import { ZFormMaterialComponent } from './z-form-material';
import { ZInputMaterialComponent } from './z-input-material';
import { ZFormService } from './z-form.service';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        ZFormMaterialComponent,
        ZInputMaterialComponent
    ],
    imports: [
        CommonModule,
        // Module Global
        ZModule,
        // Mask
        NgxMaskModule.forRoot({
          validation: false,
        })
    ],
    exports: [
      ZFormMaterialComponent,
      ZInputMaterialComponent
    ],
    providers: [
      ZFormService
    ]
})
export class ZFormModule { }
