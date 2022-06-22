import {Component, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { SteckerService } from "./stecker.service";
import { LogicService } from "./logic.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {RotorComponent} from "./rotor/rotor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChildren(RotorComponent) rotors!: QueryList<RotorComponent>;

  radio = new FormControl();
  inputControl = new FormControl();
  outputControl = new FormControl();

  title = 'enigma';
  rotorSelection = ['I','II','III','IV','V','VI','VII','VIII'];
  rotorSettings: string[] =['','','','','','','',''];
  selectedChars: string[] = ['','','','','','','',''];
  rotation: number[] = [0,0,0,0,0,0,0,0];
  pair: string[] = this.steckerService.steckeredPair;
  input: string[] = [];
  output: string[] = [];
  encode: boolean = true;
  debug: boolean = false;
  selectedCharsString: string = '';
  rotationsTemp: string = '';
  querySteckersTemp: string = '';
  querySteckers: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public steckerService: SteckerService,
    public logicService: LogicService) {
  }

  ngAfterContentChecked() {
    this.route.queryParams.subscribe(params => {
      this.rotationsTemp = params['rotation'];
      this.querySteckersTemp = params['steckers'];
    })
    if (this.rotationsTemp) {
      this.querySteckers = this.querySteckersTemp.split(',');
      this.rotation = this.rotationsTemp.split(',').map(x => parseInt(x));
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.rotors.forEach(rotor => rotor.wiggle());
      for (let i = 0; i < this.querySteckers.length; i++) {
        this.steckerService.steckerPair(this.querySteckers[i], this.querySteckers[i + 1]);
        i++
      }
    }, 50)

  }

  processInput() {
    if (this.encode) {
      this.outputControl.setValue(this.logicService.encodeString(this.inputControl.value))
    } else {
      this.outputControl.setValue(this.logicService.decodeString(this.inputControl.value))
    }
  }

  updateRotation(val: number, index: number) {
    this.rotation[index] = val;
    this.router.navigate(
      [],
      {
        queryParams: {
          rotation: this.rotation.toString()
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  updateSelectedChars(char: string, index: number) {
    this.selectedChars[index] = char;
  }

  updateRotorSettings(rotor: string, index: number) {
    this.rotorSettings[index] = rotor;
    this.logicService.rotors[index] = rotor;
  }

  changeMethod() {
    switch (this.radio.value) {
      case 'Encode':
        this.encode = true;
        break;
      case 'Decode':
        this.encode = false;
        break;
    }
  }

  changeDebug() {
    this.debug = !this.debug;
  }
}
