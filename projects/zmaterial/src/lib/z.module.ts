// NgModule
import { NgModule } from '@angular/core';

// Base
import { CommonModule } from '@angular/common';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    // Base
    CommonModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class ZModule { }