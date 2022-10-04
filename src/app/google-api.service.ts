import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Subject} from "rxjs";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '170594238961-vtcn3409ueg7lje60uc2he33v5qk3mou.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInformation {
  info: {
    sub: string,
    email: string,
    given_name: string,
    family_name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInformation>();

  constructor(
    private readonly oAuthService: OAuthService
  ) {
    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInformation);
            console.log(userProfile);
          })
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}


