import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFarmComponent } from './add-edit-farm.component';

describe('AddEditFarmComponent', () => {
  let component: AddEditFarmComponent;
  let fixture: ComponentFixture<AddEditFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
