import { Component, OnInit } from '@angular/core';
import {TileComponent} from "../tile.component";
import {SettingsSessionStorageService} from "../../../../services/settings-session-storage.service";

@Component({
  selector: 'app-settings-coloring-tile',
  templateUrl: './settings-coloring-tile.component.html',
  styleUrls: ['./settings-coloring-tile.component.scss']
})
export class SettingsColoringTileComponent extends TileComponent implements OnInit {
  constructor(
    settingsSessionStorage : SettingsSessionStorageService
  ) {
    super(settingsSessionStorage);
  }
}
