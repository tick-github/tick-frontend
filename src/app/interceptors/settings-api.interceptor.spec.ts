import {inject, TestBed} from '@angular/core/testing';
import {SettingsApiInterceptor} from './settings-api.interceptor';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";


describe('SettingsApiInterceptor', () => {

  const testIdToken: string = "TEST_ID";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: SettingsApiInterceptor, multi: true}
      ]
    })

    const mockSessionStorage = {
      getItem: (): string => {
        return testIdToken;
      }
    };
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
  })


  describe('Intercepting HTTP requests', () => {
    it('should add auth header to settings api requests', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {

        // Assert
        http.get('http://localhost:8000/api/v1/settings')
          .subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne(req => (req.headers.has('Authorization')));
        const token = request.request.headers.get('Authorization');
        expect(token).toEqual(testIdToken);

        // Cleanup
        request.flush({data: 'test'});

      }))

    it('should not add the auth header to non-api requests', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {

        // Assert
        http.get('https://www.invalidrequest.com/lolnope')
          .subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne(req => (!req.headers.has('Authorization')));

        // Cleanup
        request.flush({data: 'test'});
      }))
  })

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }))

});
