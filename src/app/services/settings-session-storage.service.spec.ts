import { TestBed } from '@angular/core/testing';

import { SettingsSessionStorageService } from './settings-session-storage.service';

describe('SettingsSessionStorageService', () => {
  let service: SettingsSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
