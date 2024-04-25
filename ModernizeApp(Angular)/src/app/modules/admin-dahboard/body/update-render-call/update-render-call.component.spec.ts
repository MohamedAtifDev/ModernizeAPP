import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRenderCallComponent } from './update-render-call.component';

describe('UpdateRenderCallComponent', () => {
  let component: UpdateRenderCallComponent;
  let fixture: ComponentFixture<UpdateRenderCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRenderCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRenderCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
