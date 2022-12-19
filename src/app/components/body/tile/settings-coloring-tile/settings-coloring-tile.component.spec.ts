import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SettingsColoringTileComponent} from './settings-coloring-tile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SettingsSessionStorageService} from "../../../../services/settings-session-storage.service";
import {SettingsApiService} from "../../../../services/settings-api.service";
import {SettingsModelBuilder} from "../../../../models/settings/SettingsModel";
import {SettingsResponse} from "../../../../models/settings/SettingsResponse";
import {InjectionToken} from "@angular/core";
import createSpy = jasmine.createSpy;

export const WINDOW = new InjectionToken('Window');
const windowMock = {location: {reload: createSpy('reload')}};

describe('SettingsColoringTileComponent', () => {
  let component: SettingsColoringTileComponent;
  let fixture: ComponentFixture<SettingsColoringTileComponent>;
  let sessionStorageService: SettingsSessionStorageService;
  let apiService: SettingsApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsColoringTileComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: WINDOW, useValue: windowMock}
      ]
    })
      .compileComponents();

    sessionStorageService = TestBed.inject(SettingsSessionStorageService);
    apiService = TestBed.inject(SettingsApiService);
    fixture = TestBed.createComponent(SettingsColoringTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.reloadPage = () => {
    }; // disable full page reload
  });

  describe('apply', () => {
    it('should not do anything if not confirmed', () => {
      // Arrange
      spyOn(window, 'confirm').and.returnValue(false);
      spyOn(apiService, 'updateSettings').and.callFake(() => Promise.resolve({} as SettingsResponse));


      // Act
      component.apply();

      // Assert
      expect(apiService.updateSettings).toHaveBeenCalledTimes(0);
    });

    it('should set the settings to default when api returns rejection', fakeAsync(() => {
      // Arrange
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(apiService, 'updateSettings').and.rejectWith(/* nothing */);
      spyOn(sessionStorageService, 'setSettings');

      // Act
      component.apply();
      tick();

      // Assert
      expect(sessionStorageService.setSettings).toHaveBeenCalledOnceWith(SettingsModelBuilder.getDefault());
    }));

    it('should set the settings when api returns successfully', fakeAsync(() => {
      // Arrange
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(apiService, 'updateSettings')
        .and.resolveTo({data: SettingsModelBuilder.getDarkDefault()} as SettingsResponse);
      spyOn(sessionStorageService, 'setSettings');

      // Act
      component.apply();
      tick();

      // Assert
      expect(sessionStorageService.setSettings).toHaveBeenCalledOnceWith(SettingsModelBuilder.getDarkDefault());
    }));
  });
});
