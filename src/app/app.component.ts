import {Component, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { SteckerService } from "./stecker.service";
import { LogicService } from "./logic.service";
import {FormControl, FormGroup} from "@angular/forms";
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
  lockSettingsControl = new FormControl();

  title = 'enigma';
  rotorSelection = ['I','II','III','IV','V','VI','VII','VIII'];
  rotorSettings: string[] =['','','','','','','',''];
  selectedChars: string[] = ['','','','','','','',''];
  rotation: number[] = [0,0,0,0,0,0,0,0];
  pair: string[] = this.steckerService.steckeredPair;
  input: string[] = [];
  output: string[] = [];
  encodeString: string = 'Encode';
  encode: boolean = true;
  selectedCharsString: string = '';
  rotationsTemp: string = '';
  querySteckersTemp: string = '';
  querySteckers: string[] = [];
  lockSettingsString: string = 'Lock Settings';
  canChangeSettings: boolean = true;
  lockIcon: string = 'bi bi-unlock';

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
      if (this.querySteckersTemp === undefined) {
        this.router.navigate(
          [],
          {
            queryParams: {
              steckers: ''
            },
            queryParamsHandling: 'merge'
          }
        );
      }
    }, 50)
  }

  resetRotors() {
    if (this.canChangeSettings) {
      this.rotation = [0, 0, 0, 0, 0, 0, 0, 0];
      this.router.navigate(
        [],
        {
          queryParams: {
            rotation: ''
          },
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  resetSteckers() {
    if (this.canChangeSettings) {
      this.steckerService.steckeredPair = [];
      this.steckerService.removeLines();
      this.router.navigate(
        [],
        {
          queryParams: {
            steckers: ''
          },
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  lockSettings() {
    switch (this.lockSettingsString) {
      case 'Lock Settings':
        this.steckerService.canChangeStecker = false;
        this.canChangeSettings = false;
        this.lockSettingsString = 'Unlock Settings';
        this.lockIcon = 'bi bi-lock';

        break;
      case 'Unlock Settings':
        this.steckerService.canChangeStecker = true;
        this.canChangeSettings = true;
        this.lockSettingsString = 'Lock Settings';
        this.lockIcon = 'bi bi-unlock';
        break;
    }
  }

  processInput() {
    if (this.encode) {
      this.outputControl.setValue(this.logicService.encodeString(this.inputControl.value))
      this.steckerService.canChangeStecker = false;
      this.canChangeSettings = false;
      this.lockSettings();
    } else {
      this.outputControl.setValue(this.logicService.decodeString(this.inputControl.value))
    }
  }

  clearInput() {
    this.inputControl.setValue('');
    this.outputControl.setValue('');
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
}
