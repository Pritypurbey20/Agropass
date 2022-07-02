import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistilleryComponent } from './distillery.component';

describe('DistilleryComponent', () => {
  let component: DistilleryComponent;
  let fixture: ComponentFixture<DistilleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistilleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistilleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
