import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBoardComponent } from '../app/switch-board/switch-board.component';

describe('SwitchBoardComponent', () => {
  let component: SwitchBoardComponent;
  let fixture: ComponentFixture<SwitchBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
