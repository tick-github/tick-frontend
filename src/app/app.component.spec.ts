import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        OAuthService,
        HttpClient,
        HttpHandler,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider
      ]
    }).compileComponents();
  });

  it('should not have a profile loaded at startup', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act

    // Assert
    expect(app.userInformation).toBeUndefined();
  })
});
