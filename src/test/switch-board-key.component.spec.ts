import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBoardKeyComponent } from '../app/switch-board/switch-board-key/switch-board-key.component';

describe('SwitchBoardKeyComponent', () => {
  let component: SwitchBoardKeyComponent;
  let fixture: ComponentFixture<SwitchBoardKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBoardKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBoardKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
