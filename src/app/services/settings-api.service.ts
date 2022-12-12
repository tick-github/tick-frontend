import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {SettingsModel} from "../settings/SettingsModel";
import {SettingsResponse} from "../settings/Response";

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  private readonly baseUrl = "http://localhost:8000/api/v1/settings/";
  private readonly contentType = {"content-type" : "application/json"};
  private readonly httpOptions = { headers : new HttpHeaders(this.contentType)};

  constructor(
    private readonly httpClient: HttpClient
  ) {  }

  async getSettings() : Promise<SettingsResponse> {
    return await lastValueFrom(this.httpClient.get<SettingsResponse>(this.baseUrl))
      .catch(data => {return data.error as SettingsResponse});
  }

  async createSettings(settings : SettingsModel) : Promise<SettingsResponse> {
    return await lastValueFrom(this.httpClient.post<SettingsResponse>(this.baseUrl, settings, this.httpOptions))
      .catch(data => {return data.error as SettingsResponse});
  }

  async updateSettings(settings : SettingsModel) : Promise<SettingsResponse> {
    return await lastValueFrom(this.httpClient.put<SettingsResponse>(this.baseUrl, settings, this.httpOptions))
      .catch(data => {return data.error as SettingsResponse});
  }
}
