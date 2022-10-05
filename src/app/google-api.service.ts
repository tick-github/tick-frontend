import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {lastValueFrom, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EmailMessage} from "./EmailMessage";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '170594238961-vtcn3409ueg7lje60uc2he33v5qk3mou.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly'
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

  private readonly gmailBaseUrl = 'https://gmail.googleapis.com/gmail/v1/users/';
  userProfileSubject = new Subject<UserInformation>();

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly httpClient: HttpClient
  ) {
    oAuthService.configure(oAuthConfig);
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

  async getEmails(userId: string, maxResults: number = 10, page: number = 1): Promise<Observable<EmailMessage[]>> {
    const queryParameters =
      new HttpParams()
        .append("maxResults", maxResults)
        .append("page", page);

    let mails: EmailMessage[] = []

    const idResponse = this.httpClient.get(
      `${this.gmailBaseUrl}${userId}/messages`,
      {params: queryParameters}
    ) as Observable<any>

    const ids = await lastValueFrom(idResponse)
    for (const element of ids.messages) {
      const messageResponse = this.httpClient.get(
        `${this.gmailBaseUrl}${userId}/messages/${element.id}`
      ) as Observable<any>

      const message = await lastValueFrom(messageResponse)
      const newMail = new EmailMessage(
        message.payload.headers.find((header: { name: string; }) => {
          return header.name === "Subject"
        }).value,
        message.payload.headers.find((header: { name: string; }) => {
          return header.name === "From"
        }).value,
        message.internalDate
      )

      mails.push(newMail)
    }

    return of<EmailMessage[]>(mails);
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.revokeTokenAndLogout().then(() => {
      this.userProfileSubject.next('' as unknown as UserInformation);
      window.location.reload();
    });
  }

}


