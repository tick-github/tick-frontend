import {Component, Input, OnInit} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";
import {SettingsModel} from "../../../settings/SettingsModel";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() user!: UserInformation;
  userSettings: SettingsModel;

  constructor(
    private readonly settingsSessionStorage: SettingsSessionStorageService) {
    this.userSettings = this.settingsSessionStorage.getSettings();
  }

  ngOnInit(): void {
  }

}
