import { TestBed } from '@angular/core/testing';

import { LogicService } from '../app/logic.service';

describe('LogicService', () => {
  let service: LogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
