import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // gateway url for settings api
    const urls : string[] = [
      "http://localhost:8000/api/v1/settings"
    ];

    if (!this.startsWithAnyOf(request.url, urls)) {
      return next.handle(request);
    }

    const idToken : string = this.getIdTokenFromSessionStorage();

    if (!idToken) {
      return next.handle(request);
    }

    // add the token to the request header
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `${idToken}`)
    });

    return next.handle(modifiedRequest);
  }

  private getIdTokenFromSessionStorage() : string {
    return sessionStorage.getItem("id_token") ?? "" as string;
  }

  private startsWithAnyOf(stringToCheck: string, substrings: string[]) : boolean {
    return substrings.some(substring => stringToCheck.startsWith(substring));
  }
}
