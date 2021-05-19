import { ReportService } from './report/report-builder/report.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZModalModule } from 'zmaterial';
import { GlobalModule } from './global.module';
import { UserComponent } from './register/user/user.component';
import { CourseComponent } from './register/course/course.component';
import { LogsComponent } from './report/logs/logs.component';
import { ReportBuilderComponent } from './report/report-builder/report-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CourseComponent,
    LogsComponent,
    ReportBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GlobalModule,
    ZModalModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
