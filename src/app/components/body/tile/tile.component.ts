import { Component, OnInit } from '@angular/core';
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {SettingsModel} from "../../../settings/SettingsModel";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  userSettings: SettingsModel;

  constructor(
    public settingsSessionStorage: SettingsSessionStorageService
  ) {
    this.userSettings = settingsSessionStorage.getSettings();
  }

  ngOnInit(): void {
  }

}
