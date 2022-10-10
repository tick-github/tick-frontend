import {Component} from '@angular/core';
import {GoogleApiService, UserInformation} from "./google-api.service";
import {lastValueFrom} from "rxjs";
import {EmailMessage} from "./EmailMessage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tick-frontend';

  mails: EmailMessage[] = []

  userInformation?: UserInformation;

  constructor(
    private readonly googleApi: GoogleApiService
  ) {
    googleApi.userProfileSubject.subscribe(userInformation => {
      this.userInformation = userInformation;
    })
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logOut() {
    this.googleApi.signOut();
  }

  async getEmails(maxResults: number = 10, page: number = 1) {
    if (!this.userInformation)
      return

    const userId = this.userInformation?.info?.sub
    this.mails = await lastValueFrom(await this.googleApi.getEmails(userId, maxResults, page));
  }

  toUTCDate(epoch: string) {
    return new Date(parseInt(epoch)).toLocaleString()
  }
}
