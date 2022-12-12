import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {GoogleAuthenticationInterceptor} from "./interceptors/google-authentication.interceptor";
import {SettingsApiInterceptor} from "./interceptors/settings-api.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: GoogleAuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SettingsApiInterceptor, multi: true}
  ]
})
export class AppModule {
}
