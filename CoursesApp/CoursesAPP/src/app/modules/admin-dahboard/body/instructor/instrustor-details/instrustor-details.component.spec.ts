import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrustorDetailsComponent } from './instrustor-details.component';

describe('InstrustorDetailsComponent', () => {
  let component: InstrustorDetailsComponent;
  let fixture: ComponentFixture<InstrustorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrustorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrustorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
