import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SteckerService} from "../../stecker.service";

@Component({
  selector: 'app-switch-board-key',
  templateUrl: './switch-board-key.component.html',
  styleUrls: ['./switch-board-key.component.css']
})
export class SwitchBoardKeyComponent implements OnInit {
  @Input() setting: string = '';
  @Input() key: string = 'A';
  @Output() keyClickEvent = new EventEmitter<string>();

  constructor(private steckerService: SteckerService) { }

  ngOnInit(): void {
  }

  intialKey(value: string){
    this.steckerService.setOriginalValue(value);
  }

  steckeredKey(value: string){
    this.steckerService.setSteckeredValue(value);
  }

  handleClick(value: string){
    switch (this.setting) {
      case 'original': {
        this.intialKey(value);
        break;
      }
      case 'change-to': {
        this.steckeredKey(value);
        break;
      }
    }
  }
}
