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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CourseComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GlobalModule,
    ZModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
