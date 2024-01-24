import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {SignupComponent} from "./feature/auth/signup/signup.component";
import {LoginComponent} from "./feature/auth/login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'sign-up', component: SignupComponent, data: { animation: 'sign-up' } },
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
