import {Component} from '@angular/core';
import {GoogleApiService, UserInformation} from "./services/google-api.service";
import {EmailMessage} from "./gmail/EmailMessage";

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
    this.mails = await this.googleApi.getAllEmails(userId, maxResults, page);
  }

  toUTCDate(epoch: string) {
    return new Date(parseInt(epoch)).toLocaleString()
  }
}
