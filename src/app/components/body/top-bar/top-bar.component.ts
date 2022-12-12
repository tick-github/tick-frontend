import {Component, Input, OnInit} from '@angular/core';
import {UserInformation} from "../../../services/google-api.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() user!: UserInformation;


  ngOnInit(): void {
  }

}
