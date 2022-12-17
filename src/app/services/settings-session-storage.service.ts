import { Injectable } from '@angular/core';
import {isSettingsModel, SettingsModel, SettingsModelBuilder} from "../settings/SettingsModel";

@Injectable({
  providedIn: 'root'
})
export class SettingsSessionStorageService {

  constructor() {
    // this is intentional
  }
  private readonly SETTINGS_KEY: string = "tick_settings";

  getSettings() : SettingsModel {
    const storedSettings = sessionStorage.getItem(this.SETTINGS_KEY);
    if (storedSettings == null) {
      return SettingsModelBuilder.getDefault();
    }

    try {
      const parsedValue = JSON.parse(storedSettings);

      if (!isSettingsModel(parsedValue)) {
        return SettingsModelBuilder.getDefault();
      }

      return parsedValue;
    } catch {
      return SettingsModelBuilder.getDefault();
    }
  }

  setSettings(settings: SettingsModel) {
    const settingsToBeStored = JSON.stringify(settings);
    sessionStorage.setItem(this.SETTINGS_KEY, settingsToBeStored);
  }

  clearSettings() {
    sessionStorage.removeItem(this.SETTINGS_KEY);
  }
}
