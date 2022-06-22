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

  constructor(private router: Router) { }

  steckerPair(orig: string, steck: string) {
    this.setOriginalValue(orig);
    this.setSteckeredValue(steck);
    console.log('Steckering ' + orig + ' and ' + steck);
  }

  setOriginalValue(value: string) {
    for (let i = 0; i < this.steckeredPair.length; i++) {
      if (value === this.steckeredPair[i]) {
        this.shouldStecker = false;
      }
      i++;
    }
    if (this.shouldStecker) {
      console.log(value);
      this.originalValue = value;
      this.startingElement = document.querySelector('.original .' + this.originalValue);
    }
    this.shouldStecker = true;
  }

  setSteckeredValue(value: string) {
    if (this.originalValue != '') {
      console.log(value);
      this.steckeredValue = value;
      this.steckeredElement = document.querySelector('.change-to .' + this.steckeredValue);
      const line = new LeaderLine(this.startingElement, this.steckeredElement, {dash: {animation: true}});
      line.color = 'skyblue';
      line.setOptions({startSocket: 'bottom', endSocket: 'top'});
      this.steckeredPair.push(this.originalValue, value);
      this.resetValues();
      console.log(this.steckeredPair);
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

  resetValues() {
    this.originalValue = '';
    this.steckeredValue = '';
    this.startingElement = null;
    this.steckeredElement = null;
  }

}
