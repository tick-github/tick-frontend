import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsColoringTileComponent } from './settings-coloring-tile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SettingsColoringTileComponent', () => {
  let component: SettingsColoringTileComponent;
  let fixture: ComponentFixture<SettingsColoringTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsColoringTileComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsColoringTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
