import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {GoogleAuthenticationInterceptor} from "./interceptors/google-authentication.interceptor";
import {SettingsApiInterceptor} from "./interceptors/settings-api.interceptor";
import {MainContainerComponent} from './components/body/main-container/main-container.component';
import {TopBarComponent} from './components/body/top-bar/top-bar.component';
import {TileComponent} from './components/body/tile/tile.component';
import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {SettingsPageComponent} from './components/pages/settings-page/settings-page.component';
import {
  SettingsColoringTileComponent
} from './components/body/tile/settings-coloring-tile/settings-coloring-tile.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    TopBarComponent,
    TileComponent,
    MainPageComponent,
    SettingsPageComponent,
    SettingsColoringTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: GoogleAuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SettingsApiInterceptor, multi: true}
  ]
})
export class AppModule {
}
