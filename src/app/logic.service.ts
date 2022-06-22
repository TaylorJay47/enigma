import { Injectable } from '@angular/core';
import { SteckerService } from "./stecker.service";

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  rotors: string[] = [];
  steckeredPairs: string[] = this.steckerService.steckeredPair;
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  rotatedRotors: string[] = [];

  constructor(private steckerService: SteckerService) { }

  log() {
    console.log(this.rotors + ' AND ' + this.steckeredPairs);
  }

  stecker(char: string): string {
    let character = char;
    for (let i = 0; i < this.steckeredPairs.length; i++) {
      if (this.steckeredPairs[i] === char.toUpperCase()) {
        character = this.steckeredPairs[i + 1];
        console.log('Changing ' + char + ' to ' + character)
      }
      i++;
    }
    return character;
  }

  destecker(char: string): string {
    console.log(this.steckeredPairs.length)
    let character = char;
    for (let i = this.steckeredPairs.length; i > 0; i--) {
      if (this.steckeredPairs[i - 1] === char.toUpperCase()) {
        character = this.steckeredPairs[i - 2];
        console.log('Changing ' + char + ' to ' + character)
      }
      i--;
    }
    return character;
  }

  encodeChar(char: string, level: number, rotation: number): string {
    console.log('Encoding char: ' + char);
    let rotor = rotation === 0 ? this.rotors[level] : this.rotors[level].substring(rotation) + this.rotors[level].substring(0, rotation);
    console.log(rotor);
    return rotor.charAt(this.alphabet.indexOf(char.toUpperCase()));
  }

  decodeChar(char: string, level: number, rotation: number): string {
    console.log('Decoding char: ' + char);
    let rotor = rotation === 0 ? this.rotors[level] : this.rotors[level].substring(rotation) + this.rotors[level].substring(0, rotation);
    console.log(rotor);
    return this.alphabet.charAt(rotor.indexOf(char.toUpperCase()));
  }

  encodeString(str: string): string {
    console.log('Encoding string: ' + str);
    str = this.stecker(str);
    let splitStr = str.split('');
    let rot = 0;
    for (let n = 0; n < splitStr.length; n++) {
      for (let i = 0; i <= 7; i++) {
        splitStr[n] = this.encodeChar(splitStr[n], i, rot);
      }
      rot++
    }
    return splitStr.join('');
  }

  decodeString(str: string): string {
    console.log('Decoding string: ' + str);
    let splitStr = str.split('');
    let rot = 0;
    for (let n = 0; n < splitStr.length; n++) {
      for (let i = 7; i >= 0; i--) {
        splitStr[n] = this.decodeChar(splitStr[n], i, rot);
      }
      rot++
    }
    str = splitStr.join('')
    return this.destecker(str);
  }

}
