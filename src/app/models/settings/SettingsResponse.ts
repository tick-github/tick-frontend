import {SettingsModel} from "./SettingsModel";

export interface SettingsResponse {
  data: SettingsModel | null,
  message: string
}
