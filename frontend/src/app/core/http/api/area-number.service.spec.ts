import { TestBed } from '@angular/core/testing';

import { AreaNumberService } from './area-number.service';

describe('AreaNumberService', () => {
  let service: AreaNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
