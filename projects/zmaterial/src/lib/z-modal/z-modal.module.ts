import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZModalComponent } from './z-modal.component';
import { ZModalService } from './z-modal.service';
import { ZModule } from '../z.module';

@NgModule({
  declarations: [
    ZModalComponent
  ],
  imports: [
    CommonModule,
    // Module Global
    ZModule
  ],
  exports: [
    ZModalComponent
  ],
  providers: [
    ZModalService
  ],
  entryComponents: [
    ZModalComponent
  ]
})
export class ZModalModule { }
