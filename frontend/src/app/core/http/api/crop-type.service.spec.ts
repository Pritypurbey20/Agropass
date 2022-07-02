import { TestBed } from '@angular/core/testing';

import { CropTypeService } from './crop-type.service';

describe('CropTypeService', () => {
  let service: CropTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
