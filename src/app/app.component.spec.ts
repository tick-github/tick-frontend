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

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act

    // Assert
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tick-frontend'`, () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act

    // Assert
    expect(app.title).toEqual('tick-frontend');
  });

  it('should have no email messages loaded at startup', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act

    // Assert
    expect(app.mails).toEqual([]);
  })

  it('should not have a profile loaded at startup', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act

    // Assert
    expect(app.userInformation).toBeUndefined();
  })
});
