import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCourseComponent } from './branch-course.component';

describe('BranchCourseComponent', () => {
  let component: BranchCourseComponent;
  let fixture: ComponentFixture<BranchCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
