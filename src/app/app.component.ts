import {Component} from '@angular/core';
import {GoogleApiService, UserInformation} from "./services/google-api.service";
import {SettingsModel} from "./settings/SettingsModel";
import {SettingsApiService} from "./services/settings-api.service";
import {SettingsSessionStorageService} from "./services/settings-session-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tick-frontend';

  userInformation!: UserInformation;
  userSettings!: SettingsModel;

  constructor(
    private readonly googleApi: GoogleApiService
  ) {
    googleApi.userProfileSubject.subscribe(userInformation => {
      this.userInformation = userInformation;
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logOut() {
    this.googleApi.signOut();
  }
}
