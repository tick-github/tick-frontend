import {TestBed, inject} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {OAuthService} from "angular-oauth2-oidc";
import {GoogleApiService, UserInformation} from "./google-api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GmailMessageIdPair, GmailMessageIdResponse} from "./gmail/GmailMessageIdResponse";
import {of} from "rxjs";

class MockAuthService {
  hasValidAccessToken() {
    return true
  }

  revokeTokenAndLogout(): Promise<any> {
    return Promise.all([])
  }

  configure(): void {
  }

  loadDiscoveryDocument(): Promise<any> {
    return Promise.resolve()
  }

  tryLoginImplicitFlow(): Promise<boolean> {
    return Promise.resolve(true)
  }

  loadUserProfile(): Promise<UserInformation> {
    return Promise.resolve({
      info: {
        sub: 'hello',
        email: 'hello@world.com',
        given_name: 'Test',
        family_name: 'Guy',
        picture: 'https://www.example.com'
      }
    } as UserInformation)
  }
}

describe('GoogleApiService', () => {

  let googleApiService: GoogleApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: OAuthService, useClass: MockAuthService},
        GoogleApiService
      ]
    })
    googleApiService = TestBed.inject(GoogleApiService)
  })

  afterEach(
    inject([HttpTestingController], (mock: HttpTestingController) => {
      mock.verify()
    })
  )

  describe('getEmailIds', () => {

    function resultAsserts(
      expectedLength: number,
      expectedResult: string[],
      actualResult: string[]
    ): void {
      // Assert
      expect(actualResult).toBeTruthy()
      expect(actualResult.length).toEqual(expectedLength)
      expect(actualResult).toEqual(expectedResult)
    }

    it('should return the ids when Google responds with a valid response',
      inject([HttpClient], async (http: HttpClient) => {

        // Arrange
        const expectedResponseBody = {
          messages: [
            {id: 'test1', threadId: 'testThread1'} as GmailMessageIdPair,
            {id: 'test2', threadId: 'testThread2'} as GmailMessageIdPair
          ] as GmailMessageIdPair[],
          nextPageToken: 'testToken',
          resulSizeEstimate: 0
        } as GmailMessageIdResponse
        spyOn(http, 'get').and.returnValue(of(expectedResponseBody))

        // Act
        const result = await googleApiService.getEmailIds('test', new HttpParams())

        // Assert
        resultAsserts(
          expectedResponseBody.messages.length,
          expectedResponseBody.messages.map(function (mip) {
            return mip.id
          }),
          result
        )
      }))

    it('should return an empty array when there are no messages',
      inject([HttpClient], async (http: HttpClient) => {

        // Arrange
        const expectedResponseBody = {
          messages: [] as GmailMessageIdPair[],
          nextPageToken: 'testToken',
          resulSizeEstimate: 0
        } as GmailMessageIdResponse
        spyOn(http, 'get').and.returnValue(of(expectedResponseBody))

        // Act
        const result = await googleApiService.getEmailIds('test', new HttpParams())

        // Assert
        resultAsserts(
          expectedResponseBody.messages.length,
          expectedResponseBody.messages.map(function (mip) {
            return mip.id
          }),
          result
        )
      }))

    it('should return an empty array when Google responds with an invalid response',
      inject([HttpClient], async (http: HttpClient) => {

        // Arrange
        const expectedResponseBody = {
          Error
        } as any
        spyOn(http, 'get').and.returnValue(of(expectedResponseBody))

        // Act
        const result = await googleApiService.getEmailIds('test', new HttpParams())

        // Assert
        resultAsserts(
          0,
          [],
          result
        )
      }))

  })
})
