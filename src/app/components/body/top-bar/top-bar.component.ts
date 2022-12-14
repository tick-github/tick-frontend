import {Component, Input, OnInit} from '@angular/core';
import {GoogleApiService, UserInformation} from "../../../services/google-api.service";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {SettingsModel} from "../../../settings/SettingsModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() user!: UserInformation;
  userSettings: SettingsModel;

  constructor(
    private readonly settingsSessionStorage: SettingsSessionStorageService,
    private readonly router: Router,
    private readonly googleApi: GoogleApiService
  ) {
    this.userSettings = this.settingsSessionStorage.getSettings();
  }

  ngOnInit(): void {
  }

  async navigateToHome() {
    await this.router.navigate(['/'])
  }

  logOut() {
    this.googleApi.signOut();
  }

}
