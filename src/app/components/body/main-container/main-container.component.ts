import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";
import {SettingsModel} from "../../../settings/SettingsModel";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnChanges {

  @Input() user!: UserInformation;
  userSettings: SettingsModel;

  constructor(
    private readonly settingsSessionStorage: SettingsSessionStorageService
  ) {
    this.userSettings = this.settingsSessionStorage.getSettings();
    console.log(this.userSettings)
  }

  ngOnInit(): void {
  }

  ngOnChanges() : void {
  }
}
