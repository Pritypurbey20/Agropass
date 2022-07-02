import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCropsComponent } from './add-edit-crops.component';

describe('AddEditCropsComponent', () => {
  let component: AddEditCropsComponent;
  let fixture: ComponentFixture<AddEditCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
