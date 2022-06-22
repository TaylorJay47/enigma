import { TestBed } from '@angular/core/testing';

import { SteckerService } from '../app/stecker.service';

describe('SteckerService', () => {
  let service: SteckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
