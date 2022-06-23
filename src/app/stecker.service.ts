import { Injectable } from '@angular/core';
import 'leader-line';
import {Router} from "@angular/router";
declare let LeaderLine: any;

@Injectable({
  providedIn: 'root'
})
export class SteckerService {
  originalValue: string = '';
  steckeredValue: string = '';
  steckeredPair: string[] = [];
  startingElement: any;
  steckeredElement: any;
  shouldStecker: boolean = true;
  lines: LeaderLine[] = [];
  canChangeStecker: boolean = true;

  constructor(private router: Router) { }

  steckerPair(orig: string, steck: string) {
    if (this.canChangeStecker) {
      this.setOriginalValue(orig);
      this.setSteckeredValue(steck);
    }
  }

  setOriginalValue(value: string) {
    if (this.canChangeStecker) {
      for (let i = 0; i < this.steckeredPair.length; i++) {
        if (value === this.steckeredPair[i]) {
          this.shouldStecker = false;
        }
        i++;
      }
      if (this.shouldStecker) {
        this.originalValue = value;
        this.startingElement = document.querySelector('.original .' + this.originalValue);
      }
      this.shouldStecker = true;
    }
  }

  setSteckeredValue(value: string) {
    if (this.canChangeStecker) {
      if (this.originalValue != '') {
        this.steckeredValue = value;
        this.steckeredElement = document.querySelector('.change-to .' + this.steckeredValue);
        this.lines!.push(new LeaderLine(this.startingElement, this.steckeredElement, {dash: {animation: true}}))
        // @ts-ignore
        this.lines[this.lines?.length - 1].color = 'skyblue';
        // @ts-ignore
        this.lines[this.lines?.length - 1].setOptions({startSocket: 'bottom', endSocket: 'top'});
        this.steckeredPair.push(this.originalValue, value);
        this.resetValues();
        this.router.navigate(
          [],
          {
            queryParams: {
              steckers: this.steckeredPair.toString()
            },
            queryParamsHandling: 'merge'
          }
        );
      } else {
        console.log('No initial value selected');
      }
    }
  }

  removeLines() {
    if (this.canChangeStecker)  {
      for (let line of this.lines!) {
        line.remove();
      }
      this.lines = [];
    }
  }

  resetValues() {
    this.originalValue = '';
    this.steckeredValue = '';
    this.startingElement = null;
    this.steckeredElement = null;
  }

}
