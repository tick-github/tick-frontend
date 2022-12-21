import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MainContainerComponent } from './main-container.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {GoogleApiService, UserInformation} from "../../../services/google-api.service";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {SettingsModelBuilder} from "../../../models/settings/SettingsModel";
import {SettingsApiService} from "../../../services/settings-api.service";
import {SettingsResponse} from "../../../models/settings/SettingsResponse";
import {SettingsSessionStorageService} from "../../../services/settings-session-storage.service";

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;
  let settingsApi: SettingsApiService;
  let sessionStorageService: SettingsSessionStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContainerComponent, TopBarComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        GoogleApiService, OAuthLogger, OAuthService, UrlHelperService, DateTimeProvider
      ]
    })
    .compileComponents();

    settingsApi = TestBed.inject(SettingsApiService);
    sessionStorageService = TestBed.inject(SettingsSessionStorageService);
    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    component.user = {
      info: {
        sub: "test",
        email: "test@test.com",
        given_name: "Tester",
        family_name: "McTestington",
        picture: "https://www.example.com/"
      }
    } as UserInformation;
    component.userSettings = SettingsModelBuilder.getDefault();
    fixture.detectChanges();
  });

  it('should call getSettings on startup', () => {
    // Arrange
    spyOn(settingsApi, 'getSettings').and.callFake(() => Promise.resolve({} as SettingsResponse));

    // Act
    TestBed.createComponent(MainContainerComponent);

    // Assert
    expect(settingsApi.getSettings).toHaveBeenCalledTimes(1);
  });

  it('should set the settings at end', fakeAsync(() => {
    // Arrange
    spyOn(settingsApi, 'getSettings').and.callFake(
      () => Promise.resolve({data: SettingsModelBuilder.getDarkDefault()} as SettingsResponse)
    );
    spyOn(sessionStorageService, 'setSettings').and.callFake(() => {});

    // Act
    TestBed.createComponent(MainContainerComponent);
    tick();

    // Assert
    expect(sessionStorageService.setSettings).toHaveBeenCalledOnceWith(SettingsModelBuilder.getDarkDefault());
  }));

  it('should call createSettings on rejected getSettings request', fakeAsync(() => {
    // Arrange
    spyOn(settingsApi, 'getSettings').and.rejectWith({});
    spyOn(settingsApi, 'createSettings').and.resolveTo(
      {data: SettingsModelBuilder.getDefault()} as SettingsResponse
    );

    // Act
    TestBed.createComponent(MainContainerComponent);
    tick();

    // Assert
    expect(settingsApi.createSettings).toHaveBeenCalledTimes(1);
    expect(component.userSettings).toEqual(SettingsModelBuilder.getDefault());
  }));

  it('should default to default at createSettings rejection', fakeAsync(() => {
    // Arrange
    spyOn(settingsApi, 'getSettings').and.rejectWith({});
    spyOn(settingsApi, 'createSettings').and.rejectWith({});

    // Act
    TestBed.createComponent(MainContainerComponent);
    tick();

    // Assert
    expect(component.userSettings).toEqual(SettingsModelBuilder.getDefault());
  }));
});
