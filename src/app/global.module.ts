// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

// Toast
import { ToastrModule } from 'ngx-toastr';

// zMaterial
import {
    ZModalModule,
    ZMenuModule,
    ZFormModule
} from 'zmaterial';

@NgModule({
    declarations: [],
    imports: [
        // Angular
        CommonModule,

        // Http
        HttpClientModule,

        // Flex Layout
        FlexLayoutModule,

        // Forms
        ReactiveFormsModule,
        FormsModule,

        // Angular Material
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,

        // Toast
        ToastrModule.forRoot(),

        // zMaterial
        ZModalModule,
        ZMenuModule
    ],
    exports: [
        // Flex Layout
        FlexLayoutModule,

        // Forms
        ReactiveFormsModule,
        FormsModule,

        // Angular Material
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,

        // Toast
        ToastrModule,

        // zMaterial
        ZModalModule,
        ZMenuModule,
        ZFormModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalModule { }
