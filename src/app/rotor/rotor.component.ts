import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-rotor',
  templateUrl: './rotor.component.html',
  styleUrls: ['./rotor.component.css']
})
export class RotorComponent implements OnInit {
  @Input() numeral: string = '';
  @Input() activeChar: number = 0;
  @Input() rotation: number = 0;
  @Output() rotationChange = new EventEmitter<number>();
  @Output() selectSettingEvent = new EventEmitter<string>();
  @Output() selectCharEvent = new EventEmitter<string>();

  private characterStrings: {[key: string]: string} = {
    'I': 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
    'II': 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
    'III': 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
    'IV': 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
    'V': 'VZBRGITYUPSDNHLXAWMJQOFECK',
    'VI': 'JPGVOUMFYQBENHZRDKASXLICTW',
    'VII': 'NZJHGRCXMYSWBOUFAIVLPEKQDT',
    'VIII': 'FKQHTLXOCBJSPDZRAMEWNIUYGV',
    'default': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  };
  characters: string = '';
  outputString: string = '';
  activeCharString: string = '';
  charactersRot: string = '';

  constructor(private route: ActivatedRoute) { }

  setup() {
    this.characters = this.characterStrings[this.numeral];
    this.charactersRot = this.rotation === 0 ? this.characters : this.characters.substring(this.rotation) + this.characters.substring(0, this.rotation);
    this.activeCharString = this.charactersRot.charAt(this.activeChar)
    this.outputString = this.charactersRot.substring(0, this.activeChar) + this.activeCharString + this.charactersRot.substring(this.activeChar + 1)
    this.selectChar(this.activeCharString);
    this.selectSetting(this.charactersRot);
  }


  ngOnInit(): void {
    this.setup();
  }

  wiggle() {
    this.right();
    this.left();
  }

  left() {
    if (this.rotation > 0) {
      this.rotation -= 1;
    } else {
      this.rotation = 25;
    }
    this.rotationChange.emit(this.rotation);
    this.setup();
  }

  right() {
    if (this.rotation < 26) {
      this.rotation += 1;
    } else {
      this.rotation = 1;
    }
    this.rotationChange.emit(this.rotation);
    this.setup();
  }


  selectChar(value: string) {
    this.selectCharEvent.emit(value);
  }

  selectSetting(value: string) {
    this.selectSettingEvent.emit(value);
  }
}
