import {Component} from '@angular/core';
import {GoogleApiService, UserInformation} from "./services/google-api.service";
import {SettingsModel} from "./models/settings/SettingsModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
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
