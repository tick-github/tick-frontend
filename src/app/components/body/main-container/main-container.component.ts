import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";
import {SettingsApiService} from "../../../services/settings-api.service";
import {retry} from "rxjs";
import {SettingsModel, SettingsModelBuilder} from "../../../settings/SettingsModel";
import {SettingsResponse} from "../../../settings/Response";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnChanges {

  @Input() user!: UserInformation;

  constructor(private readonly settingsApi: SettingsApiService) {
  }

  ngOnInit(): void {
    this.settingsInit().catch(retry(1))
  }

  ngOnChanges() : void {
  }

  private async settingsInit() : Promise<SettingsModel> {
    let response: SettingsResponse = await this.settingsApi.getSettings();
    if (response.data !== null) {
      console.log("Found settings object.")
      console.log(response.data)
      return response.data;
    }

    response = await this.settingsApi.createSettings(SettingsModelBuilder.getDefault());
    if (response.data !== null) {
      console.log("Created new settings object.");
      return response.data;
    }

    console.log("Error. Defaulted to default settings object.")
    return SettingsModelBuilder.getDefault();
  }

}
