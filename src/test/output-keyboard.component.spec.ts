import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputKeyboardComponent } from '../app/output-keyboard/output-keyboard.component';

describe('OutputKeyboardComponent', () => {
  let component: OutputKeyboardComponent;
  let fixture: ComponentFixture<OutputKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
