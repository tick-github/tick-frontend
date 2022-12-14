import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";
import {SettingsModel, SettingsModelBuilder} from "../../../settings/SettingsModel";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {retry} from "rxjs";
import {SettingsApiService} from "../../../services/settings-api.service";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnChanges {

  @Input() user!: UserInformation;
  userSettings: SettingsModel;

  constructor(
    private readonly settingsApi: SettingsApiService,
    private readonly settingsSessionStorage: SettingsSessionStorageService
  ) {
    settingsApi.getSettings().then(
      (successfulResponse) => {this.userSettings = successfulResponse.data as SettingsModel},
      () => {retry(5);}
    ).catch(() => {this.userSettings = SettingsModelBuilder.getDefault()})
      .then(() => {settingsSessionStorage.setSettings(this.userSettings)})
    this.userSettings = this.settingsSessionStorage.getSettings();
  }

  ngOnInit(): void {
  }

  ngOnChanges() : void {
  }
}
