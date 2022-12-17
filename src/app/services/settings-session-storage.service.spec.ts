import { TestBed } from '@angular/core/testing';

import { SettingsSessionStorageService } from './settings-session-storage.service';
import {SettingsModel, SettingsModelBuilder} from "../models/settings/SettingsModel";

describe('SettingsSessionStorageService', () => {
  let service: SettingsSessionStorageService;

  const testSettingsModel : SettingsModel = {
    primaryColor: "black",
    secondaryColor: "black",
    tertiaryColor: "black",
    locale: "nl-NL",
    weatherCity: "Amsterdam, the Netherlands"
  } as SettingsModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsSessionStorageService);
  });

  describe('getSettings', () => {
    it('should return the settings model if it exists in the session storage', () => {
      // Arrange
      spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(testSettingsModel));

      // Act
      const returnValue = service.getSettings();

      // Assert
      expect(returnValue).toEqual(testSettingsModel);
    });

    it('should return the default model if the key does not exist in session storage', () => {
      // Arrange
      spyOn(sessionStorage, 'getItem').and.returnValue(null);

      // Act
      const returnValue = service.getSettings();

      // Assert
      expect(returnValue).toEqual(SettingsModelBuilder.getDefault());
    });

    it('should return default if the value in the session storage key is garbage', () => {
      // Arrange
      spyOn(sessionStorage, 'getItem').and.returnValue("garbage");

      // Act
      const returnValue = service.getSettings();

      // Assert
      expect(returnValue).toEqual(SettingsModelBuilder.getDefault());
    });

    it('should return default if the value in the session storage key is an invalid object', () => {
      // Arrange
      spyOn(sessionStorage, 'getItem').and.returnValue('{"hello":"world"}');

      // Act
      const returnValue = service.getSettings();

      // Assert
      expect(returnValue).toEqual(SettingsModelBuilder.getDefault());
    });
  });

  describe('setSettings', () => {
    it('should call the setItem method of sessionStorage', () => {
      // Arrange
      spyOn(sessionStorage, 'setItem').and.callFake(() => {});

      // Act
      service.setSettings(testSettingsModel);

      // Assert
      expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearSettings', () => {
    it('should call the removeItem method of sessionStorage', () => {
      // Arrange
      spyOn(sessionStorage, 'removeItem').and.callFake(() => {});

      // Act
      service.clearSettings();

      // Assert
      expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1);
    });
  });
});
