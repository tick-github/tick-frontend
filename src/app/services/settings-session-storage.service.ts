import { Injectable } from '@angular/core';
import {SettingsModel, SettingsModelBuilder} from "../settings/SettingsModel";

@Injectable({
  providedIn: 'root'
})
export class SettingsSessionStorageService {

  constructor() {  }
  private readonly SETTINGS_KEY: string = "tick_settings";

  getSettings() : SettingsModel {
    const storedSettings = sessionStorage.getItem(this.SETTINGS_KEY) as string | null;
    if (storedSettings == null) {
      return SettingsModelBuilder.getDefault();
    }

    return JSON.parse(storedSettings) as SettingsModel;
  }

  setSettings(settings: SettingsModel) {
    const settingsToBeStored = JSON.stringify(settings);
    sessionStorage.setItem(this.SETTINGS_KEY, settingsToBeStored);

    return;
  }
}
