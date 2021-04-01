import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './register/course/course.component';
import { UserComponent } from './register/user/user.component';

const routes: Routes = [
  {
    path: 'register/user',
    component: UserComponent,
  },
  {
    path: 'register/course',
    component: CourseComponent,
  },
  {
    path: '',
    component: UserComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
