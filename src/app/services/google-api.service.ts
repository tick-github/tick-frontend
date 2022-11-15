import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {lastValueFrom, Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EmailMessage} from "../gmail/EmailMessage";
import {GmailMessageIdResponse} from "../gmail/GmailMessageIdResponse";
import {GmailSingleMessageResponse} from "../gmail/GmailSingleMessageResponse";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '170594238961-vtcn3409ueg7lje60uc2he33v5qk3mou.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
  logoutUrl: 'http://localhost:4200'
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
          })
        }
      })
    })
  }

  async getAllEmails(userId: string, maxResults: number = 10, page: number = 1): Promise<EmailMessage[]> {
    const queryParameters =
      new HttpParams()
        .append("maxResults", maxResults)
        .append("page", page)

    let mails: EmailMessage[] = []

    const ids = await this.getEmailIds(userId, queryParameters)
    for (const element of ids) {
      mails.push(await this.getSingleEmail(userId, element))
    }

    return mails
  }

  async getEmailIds(userId: string, queryParams: HttpParams): Promise<string[]> {
    const messageIdResponse = await lastValueFrom(this.httpClient.get(
      `${this.gmailBaseUrl}${userId}/messages`,
      {params: queryParams}
    ) as Observable<GmailMessageIdResponse>)

    if (!messageIdResponse || !messageIdResponse.messages || messageIdResponse?.messages?.length <= 0) {
      return []
    }

    return messageIdResponse.messages.map(function (mip) {
      return mip.id
    })
  }

  async getSingleEmail(userId: string, messageId: string): Promise<EmailMessage> {
    const messageResponse = await lastValueFrom(this.httpClient.get(
      `${this.gmailBaseUrl}${userId}/messages/${messageId}`
    ) as Observable<GmailSingleMessageResponse>)

    if (!messageResponse || !messageResponse?.payload?.headers) {
      return {
        subject: 'Error retrieving email from server',
        sender: 'internal',
        sentDate: '0'
      } as EmailMessage
    }

    return {
      subject: messageResponse.payload.headers.find((header) => {
        return header.name === 'Subject'
      })?.value ?? '\<no subject\>',
      sender: messageResponse.payload.headers.find((header) => {
        return header.name === 'From'
      })?.value ?? '\<no sender\>',
      sentDate: messageResponse.internalDate
    } as EmailMessage
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.revokeTokenAndLogout().then(() => {
      this.userProfileSubject.next('' as unknown as UserInformation);
    });
  }

}


