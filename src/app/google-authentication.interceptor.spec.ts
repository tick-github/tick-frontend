import {GoogleAuthenticationInterceptor} from "./google-authentication.interceptor";
import {inject, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

class MockAuthService {
  hasValidAccessToken() {
    return true;
  }

  getAccessToken() {
    return 'test-token';
  }
}

describe('GoogleAuthenticationInterceptor', () => {

  let mockAuthService: MockAuthService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
            {provide: HTTP_INTERCEPTORS, useClass: GoogleAuthenticationInterceptor, multi: true},
            {provide: OAuthService, useClass: MockAuthService},
            UrlHelperService,
            OAuthLogger,
            DateTimeProvider
          ]
        }
      )
      mockAuthService = new MockAuthService();
    }
  )

  describe('Intercepting HTTP requests', () => {
    it('should add auth header to request to google gmail', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
      http.get('https://gmail.googleapis.com/gmail/v1/users/')
        .subscribe(response => expect(response).toBeTruthy());

      const request = mock.expectOne(req => (req.headers.has('Authorization')));
      const token = request.request.headers.get('Authorization');
      expect(token).toEqual('Bearer ' + mockAuthService.getAccessToken());

      request.flush({data:'test'});
      mock.verify();
    }))

    it('should add auth header to request to google calendar', inject([HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('https://www.googleapis.com/calendar/v3/users/')
        .subscribe(response => expect(response).toBeTruthy());

      const request = mock.expectOne(req => (req.headers.has('Authorization')));
      const token = request.request.headers.get('Authorization');
      expect(token).toEqual('Bearer ' + mockAuthService.getAccessToken());

      request.flush({data:'test'});
      mock.verify();
    }))

    it('should NOT add an auth header to oidc requests', inject([HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('https://www.test.com/openid-configuration')
        .subscribe(response => expect(response).toBeTruthy());

      const request = mock.expectOne(req => (!req.headers.has('Authorization')));

      request.flush({data:'test'});
      mock.verify();
    }))

    it('should NOT add an auth header to non-google requests', inject([HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('https://www.example.com')
        .subscribe(response => expect(response).toBeTruthy());

      const request = mock.expectOne(req => (!req.headers.has('Authorization')));

      request.flush({data:'test'});
      mock.verify();
    }))
  })

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }))
})
