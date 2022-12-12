import { TestBed } from '@angular/core/testing';

import { SettingsApiInterceptor } from './settings-api.interceptor';

describe('SettingsApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SettingsApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SettingsApiInterceptor = TestBed.inject(SettingsApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
