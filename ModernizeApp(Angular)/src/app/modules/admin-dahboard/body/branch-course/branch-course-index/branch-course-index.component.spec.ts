import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCourseIndexComponent } from './branch-course-index.component';

describe('BranchCourseIndexComponent', () => {
  let component: BranchCourseIndexComponent;
  let fixture: ComponentFixture<BranchCourseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchCourseIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchCourseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
