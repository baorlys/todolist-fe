import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {SignupComponent} from "./feature/auth/sign-up/signup.component";
import {LoginComponent} from "./feature/auth/login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TodoListComponent} from "./feature/todo-list/todo-list.component";
import {authGuard} from "./core/guard/auth.guard";
import {loginGuard} from "./feature/auth/login/guard/login.guard";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";

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
    canActivate: [authGuard]
  }
  ,
  { path: '**',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  exports: [],
  providers: [
  ]
})
export class AppRoutingModule {
}
