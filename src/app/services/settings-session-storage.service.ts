import { Injectable } from '@angular/core';
import {SettingsModel, SettingsModelBuilder} from "../settings/SettingsModel";

@Injectable({
  providedIn: 'root'
})
export class SettingsSessionStorageService {

  constructor() {  }

  getSettings() : SettingsModel {
    const storedSettings = sessionStorage.getItem("tick_settings") as string | null;
    if (storedSettings == null) {
      return SettingsModelBuilder.getDefault();
    }

    return JSON.parse(storedSettings) as SettingsModel;
  }

  setSettings(settings: SettingsModel) {
    const settingsToBeStored = JSON.stringify(settings);
    sessionStorage.setItem("tick_settings", settingsToBeStored);

    return;
  }
}
