import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCourseDeleteComponent } from './branch-course-delete.component';

describe('BranchCourseDeleteComponent', () => {
  let component: BranchCourseDeleteComponent;
  let fixture: ComponentFixture<BranchCourseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchCourseDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchCourseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
