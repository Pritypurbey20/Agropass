import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropTypeComponent } from './crop-type.component';

describe('CropTypeComponent', () => {
  let component: CropTypeComponent;
  let fixture: ComponentFixture<CropTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
