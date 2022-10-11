import {TestBed, inject} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {OAuthService} from "angular-oauth2-oidc";
import {GoogleApiService} from "./google-api.service";

class MockAuthService {
  hasValidAccessToken() {
    return true
  }

  revokeTokenAndLogout(): Promise<any> {
    return Promise.all([]);
  }
}

describe('GoogleApiService', () => {

  let mockAuthService: MockAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: OAuthService, useClass: MockAuthService},
        GoogleApiService
      ]
    })
    mockAuthService = new MockAuthService()
  })

  afterEach(
    inject([HttpTestingController], (mock: HttpTestingController) => {
      mock.verify()
    })
  )

  describe('getEmails', async () => {

    it('', () => {
      expect(1).toEqual(1)
    })

  })
})
