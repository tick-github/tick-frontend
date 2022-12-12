export interface SettingsModel {
  primaryColor : string,
  secondaryColor : string,
  tertiaryColor: string,
  locale : string,
  weatherCity : string
}

export abstract class SettingsModelBuilder {
  public static getDefault() : SettingsModel {
    return {
      primaryColor: "black",
      secondaryColor: "pink",
      tertiaryColor: "deepskyblue",
      locale: "nl-NL",
      weatherCity: "Eindhoven, the Netherlands"
    } as SettingsModel
  }

  public static getDarkDefault() : SettingsModel {
    return {
      primaryColor: "white",
      secondaryColor: "gray",
      tertiaryColor: "deepskyblue",
      locale: "nl-NL",
      weatherCity: "Eindhoven, the Netherlands"
    } as SettingsModel
  }
}
