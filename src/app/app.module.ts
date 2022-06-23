import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RotorComponent } from './rotor/rotor.component';
import { SwitchBoardComponent } from './switch-board/switch-board.component';
import { BoldTextPipe } from './bold-text.pipe';
import { SwitchBoardKeyComponent } from './switch-board/switch-board-key/switch-board-key.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    RotorComponent,
    SwitchBoardComponent,
    BoldTextPipe,
    SwitchBoardKeyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
