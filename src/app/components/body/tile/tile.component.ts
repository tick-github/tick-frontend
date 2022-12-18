import { Component } from '@angular/core';
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {SettingsModel} from "../../../models/settings/SettingsModel";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  userSettings: SettingsModel;

  constructor(
    public settingsSessionStorage: SettingsSessionStorageService
  ) {
    this.userSettings = settingsSessionStorage.getSettings();
  }
}
