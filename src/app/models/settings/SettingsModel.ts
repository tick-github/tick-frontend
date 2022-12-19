export interface SettingsModel {
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  locale: string,
  weatherCity: string
}

export function isSettingsModel(object: unknown): object is SettingsModel {
  return Object.prototype.hasOwnProperty.call(object, "primaryColor")
    && Object.prototype.hasOwnProperty.call(object, "secondaryColor")
    && Object.prototype.hasOwnProperty.call(object, "tertiaryColor")
    && Object.prototype.hasOwnProperty.call(object, "locale")
    && Object.prototype.hasOwnProperty.call(object, "weatherCity")
}

export abstract class SettingsModelBuilder {
  public static getDefault(): SettingsModel {
    return {
      primaryColor: "#000000",
      secondaryColor: "#ffc0cb",
      tertiaryColor: "#00bfff",
      locale: "nl-NL",
      weatherCity: "Eindhoven, the Netherlands"
    } as SettingsModel
  }

  public static getDarkDefault(): SettingsModel {
    return {
      primaryColor: "#ffffff",
      secondaryColor: "#808080",
      tertiaryColor: "#000000",
      locale: "nl-NL",
      weatherCity: "Eindhoven, the Netherlands"
    } as SettingsModel
  }
}
