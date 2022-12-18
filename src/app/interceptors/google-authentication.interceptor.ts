import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";

@Injectable()
export class GoogleAuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: OAuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // google urls
    const googleUrls = [
      'https://gmail.googleapis.com/gmail/v1/users/',
      'https://www.googleapis.com/calendar/v3/users/'
    ]

    // get the bearer token
    const userToken = this.authService.getAccessToken();

    // exclude certain requests from modification
    if (request.url.includes('openid-configuration') ||
      !this.checkIfStringStartWithAnyOf(request.url, googleUrls) ||
      !userToken) {
      return next.handle(request);
    }

    // add the bearer token to the request header
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${userToken}`)
    });

    // forward the modified request header to the next point in the chain
    return next.handle(modifiedRequest);
  }

  private checkIfStringStartWithAnyOf(stringToCheck: string, substrings: string[]) {
    return substrings.some(substring => stringToCheck.startsWith(substring));
  }
}
