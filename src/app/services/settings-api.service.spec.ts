import { TestBed } from '@angular/core/testing';

import { SettingsApiService } from './settings-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SettingsApiService', () => {
  let service: SettingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SettingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
