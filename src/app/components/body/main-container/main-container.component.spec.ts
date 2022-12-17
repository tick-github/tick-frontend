import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainerComponent } from './main-container.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {GoogleApiService, UserInformation} from "../../../services/google-api.service";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {SettingsModelBuilder} from "../../../settings/SettingsModel";

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContainerComponent, TopBarComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        GoogleApiService, OAuthLogger, OAuthService, UrlHelperService, DateTimeProvider
      ]
    })
    .compileComponents();

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
