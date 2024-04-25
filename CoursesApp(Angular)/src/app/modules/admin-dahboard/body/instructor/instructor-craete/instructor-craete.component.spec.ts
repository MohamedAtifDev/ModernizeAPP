import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCraeteComponent } from './instructor-craete.component';

describe('InstructorCraeteComponent', () => {
  let component: InstructorCraeteComponent;
  let fixture: ComponentFixture<InstructorCraeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCraeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCraeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
