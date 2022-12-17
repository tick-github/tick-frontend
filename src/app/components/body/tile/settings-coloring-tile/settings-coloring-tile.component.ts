import {Component, OnInit} from '@angular/core';
import {TileComponent} from "../tile.component";
import {SettingsSessionStorageService} from "../../../../services/settings-session-storage.service";
import {SettingsApiService} from "../../../../services/settings-api.service";
import {SettingsModel, SettingsModelBuilder} from "../../../../settings/SettingsModel";

@Component({
  selector: 'app-settings-coloring-tile',
  templateUrl: './settings-coloring-tile.component.html',
  styleUrls: ['../tile.component.scss', './settings-coloring-tile.component.scss']
})
export class SettingsColoringTileComponent extends TileComponent implements OnInit {
  constructor(
    settingsSessionStorage : SettingsSessionStorageService,
    private readonly settingsApi : SettingsApiService
  ) {
    super(settingsSessionStorage);
    this.primaryColor = this.userSettings.primaryColor;
    this.secondaryColor = this.userSettings.secondaryColor;
    this.tertiaryColor = this.userSettings.tertiaryColor;
  }

  public primaryColor: string;
  public secondaryColor: string;
  public tertiaryColor: string;

  apply() {
    if (confirm("Are you sure you want to update your coloring scheme?")) {
      this.settingsApi.updateSettings({
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
        tertiaryColor: this.tertiaryColor,
        locale: this.userSettings.locale,
        weatherCity: this.userSettings.weatherCity
      } as SettingsModel)
        .then((successfulResponse) => {
          this.userSettings = successfulResponse.data as SettingsModel
        })
        .catch(() => {
          this.userSettings = SettingsModelBuilder.getDefault()
        })
        .finally(() => {
          this.settingsSessionStorage.setSettings(this.userSettings);
          window.location.reload()
        }
      );
    }
  }
}
