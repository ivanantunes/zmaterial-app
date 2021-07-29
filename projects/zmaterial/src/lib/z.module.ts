// Configs
export interface ZModuleConfig {
  languageData: ZLanguageData;
}

// NgModule
import { ModuleWithProviders, NgModule } from '@angular/core';

// Base
import { CommonModule } from '@angular/common';

// Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { ZLanguageData, ZTranslateService } from './services';

// Pipe
import { ZTranslationPipe } from './pipes/z-translation.pipe';

// Providers
import { MatDateTimeIntlProvider } from './providers';

// Ngx
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    ZTranslationPipe,
  ],
  imports: [
    // Base
    CommonModule,

    // Ngx
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatFileInputModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatTableModule,
    MatStepperModule,
    MatTabsModule,
    MatBadgeModule,

    // Forms
    ReactiveFormsModule,
    FormsModule,

    // Layout
    FlexLayoutModule,

  ],
  exports: [
    // Ngx
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatFileInputModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatTableModule,
    MatStepperModule,
    MatTabsModule,
    MatBadgeModule,

    // Forms
    ReactiveFormsModule,
    FormsModule,

    // Layout
    FlexLayoutModule,

    // Pipes
    ZTranslationPipe
  ],
  providers: [
    ZTranslateService
  ]
})
export class ZModule {
  static forRoot(config: ZModuleConfig): ModuleWithProviders<ZModule> {
    return {
      ngModule: ZModule,
      providers: [
        MatDateTimeIntlProvider,
        ZTranslateService,
        {provide: 'langConfig', useValue: config.languageData}
      ]
    };
  }
}
