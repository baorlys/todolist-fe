import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserAnimationsModule, provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./core/interceptor/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideNoopAnimations(), provideHttpClient(withInterceptors([tokenInterceptor]))],
};
