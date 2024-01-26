import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {SignupComponent} from "./feature/auth/sign-up/signup.component";
import {LoginComponent} from "./feature/auth/login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TodoListComponent} from "./feature/todo-list/todo-list.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'sign-up', component: SignupComponent, data: { animation: 'sign-up' } },
  { path: 'test-todo', component: TodoListComponent },
  { path: '**',component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,],
  exports: [],
  providers: []
})
export class AppRoutingModule {
}
