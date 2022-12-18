import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/pages/main-page/main-page.component";
import {SettingsPageComponent} from "./components/pages/settings-page/settings-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'settings', component: SettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
