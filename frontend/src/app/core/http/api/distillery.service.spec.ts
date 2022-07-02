import { TestBed } from '@angular/core/testing';

import { DistilleryService } from './distillery.service';

describe('DistilleryService', () => {
  let service: DistilleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistilleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
