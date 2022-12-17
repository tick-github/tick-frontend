import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import {GoogleApiService, UserInformation} from "../../../services/google-api.service";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SettingsModelBuilder} from "../../../settings/SettingsModel";

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        GoogleApiService, OAuthLogger, OAuthService, UrlHelperService, DateTimeProvider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
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
