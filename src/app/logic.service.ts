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
  regex: RegExp = /[a-zA-Z]/;

  constructor(private steckerService: SteckerService) { }

  log() {
    console.log(this.rotors + ' AND ' + this.steckeredPairs);
  }

  stecker(char: string): string {
    let character = char;
    for (let i = 0; i < this.steckeredPairs.length; i++) {
      if (this.steckeredPairs[i] === char.toUpperCase()) {
        character = this.steckeredPairs[i + 1];
      }
      i++;
    }
    return character;
  }

  destecker(char: string): string {
    let character = char;
    for (let i = this.steckeredPairs.length; i > 0; i--) {
      if (this.steckeredPairs[i - 1] === char.toUpperCase()) {
        character = this.steckeredPairs[i - 2];
      }
      i--;
    }
    return character;
  }

  encodeChar(char: string, level: number, rotation: number): string {
    let rotor = rotation === 0 ? this.rotors[level] : this.rotors[level].substring(rotation) + this.rotors[level].substring(0, rotation);
    return rotor.charAt(this.alphabet.indexOf(char.toUpperCase()));
  }

  decodeChar(char: string, level: number, rotation: number): string {
    let rotor = rotation === 0 ? this.rotors[level] : this.rotors[level].substring(rotation) + this.rotors[level].substring(0, rotation);
    return this.alphabet.charAt(rotor.indexOf(char.toUpperCase()));
  }

  encodeString(str: string): string {
    str = this.stecker(str);
    let splitStr = str.split('');
    let rot = 0;
    for (let n = 0; n < splitStr.length; n++) {
      if (this.regex.test(splitStr[n])) {
        for (let i = 0; i <= 7; i++) {
          splitStr[n] = this.encodeChar(splitStr[n], i, rot);
        }
        rot++
      }
    }
    return splitStr.join('');
  }

  decodeString(str: string): string {
    let splitStr = str.split('');
    let rot = 0;
    for (let n = 0; n < splitStr.length; n++) {
      if (this.regex.test(splitStr[n])) {
        for (let i = 7; i >= 0; i--) {
          splitStr[n] = this.decodeChar(splitStr[n], i, rot);
        }
        rot++
      }
    }
    str = splitStr.join('')
    return this.destecker(str);
  }

}
