import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZModule } from '../z.module';
import { ZMenuMaterialComponent } from './z-menu-material';
import { ZMenuBootstrapComponent } from './z-menu-bootstrap';

@NgModule({
    declarations: [
        ZMenuMaterialComponent,
        ZMenuBootstrapComponent
    ],
    imports: [
        CommonModule,
        // Module Global
        ZModule
    ],
    exports: [
        ZMenuMaterialComponent,
        ZMenuBootstrapComponent
    ],
})
export class ZMenuModule { }
