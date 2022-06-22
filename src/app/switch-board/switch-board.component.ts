import {Component, Input, OnInit} from '@angular/core';
import { LogicService } from "../logic.service";

@Component({
  selector: 'app-switch-board',
  templateUrl: './switch-board.component.html',
  styleUrls: ['./switch-board.component.css']
})
export class SwitchBoardComponent implements OnInit {
  @Input() setting: string = '';
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  charactersArray = this.characters.split('');

  constructor(private logicService: LogicService ) { }

  ngOnInit(): void {
  }

}
