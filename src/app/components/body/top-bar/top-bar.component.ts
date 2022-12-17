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
  @Input() userSettings!: SettingsModel;

  constructor(
    private readonly settingsSessionStorage: SettingsSessionStorageService,
    private readonly router: Router,
    private readonly googleApi: GoogleApiService
  ) {
  }

  ngOnInit(): void {
  }

  async navigateTo(route: string) {
    await this.router.navigate([route])
  }

  logOut() {
    this.settingsSessionStorage.clearSettings();
    this.googleApi.signOut();
  }

}
