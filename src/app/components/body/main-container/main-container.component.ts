import {Component, Input} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";
import {SettingsModel, SettingsModelBuilder} from "../../../models/settings/SettingsModel";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {SettingsApiService} from "../../../services/settings-api.service";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {

  @Input() user!: UserInformation;
  userSettings!: SettingsModel;

  constructor(
    private readonly settingsApi: SettingsApiService,
    private readonly settingsSessionStorage: SettingsSessionStorageService
  ) {
    settingsApi.getSettings().then(
      (successfulResponse) => {
        this.userSettings = successfulResponse.data as SettingsModel
      }, (/* on rejected try and create a new settings entry */) => {
        settingsApi.createSettings(SettingsModelBuilder.getDefault()).then(
          (successfulResponse) => {
            this.userSettings = successfulResponse.data as SettingsModel
          }, (/* on rejected default to default */) => {
            this.userSettings = SettingsModelBuilder.getDefault();
          }
        )
      }
    ).finally(() => {
      settingsSessionStorage.setSettings(this.userSettings)
    });
  }
}
