import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";
import {LOCALE_ID, NgModule} from "@angular/core";
import {SignupComponent} from "./feature/auth/sign-up/signup.component";
import {LoginComponent} from "./feature/auth/login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TodoListComponent} from "./feature/todo-list/todo-list.component";
import {authGuard} from "./core/guard/auth.guard";
import {loginGuard} from "./feature/auth/login/guard/login.guard";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {SchedulerModule} from "angular-calendar-scheduler";
import { CalendarModule, MOMENT } from 'angular-calendar';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_FORMATS} from "./feature/todo-list/tdl-add/tdl-add.component";
import {UserComponent} from "./feature/user/user.component";
import {ProjectComponent} from "./feature/project/project.component";
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',
    component: LoginComponent,
    data: { animation: 'login' },
    canActivate: [loginGuard],
  },
  { path: 'sign-up',
    component: SignupComponent,
    data: { animation: 'sign-up' }
  },
  { path: 'todo-list',
    component: TodoListComponent ,
    canActivate: [authGuard],
    data: { animation: 'todo-list'}
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [authGuard],
    data: { animation: 'project'}
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [authGuard],
    data: { animation: 'profile'}

  },
  { path: '**',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    //@ts-ignore
    CalendarModule.forRoot(),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MOMENT, useValue: moment }
  ],
})
export class AppRoutingModule {
}
