import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {SettingsModel} from "../models/settings/SettingsModel";
import {SettingsResponse} from "../models/settings/SettingsResponse";

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  private readonly baseUrl = "http://localhost:8000/api/v1/settings/";
  private readonly contentType = {"content-type": "application/json"};
  private readonly httpOptions = {headers: new HttpHeaders(this.contentType)};

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  async getSettings(): Promise<SettingsResponse> {
    return lastValueFrom(this.httpClient.get<SettingsResponse>(this.baseUrl));
  }

  async createSettings(settings: SettingsModel): Promise<SettingsResponse> {
    return lastValueFrom(this.httpClient.post<SettingsResponse>(this.baseUrl, settings, this.httpOptions));
  }

  async updateSettings(settings: SettingsModel): Promise<SettingsResponse> {
    return lastValueFrom(this.httpClient.put<SettingsResponse>(this.baseUrl, settings, this.httpOptions));
  }
}
