import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRenderCallComponent } from './delete-render-call.component';

describe('DeleteRenderCallComponent', () => {
  let component: DeleteRenderCallComponent;
  let fixture: ComponentFixture<DeleteRenderCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRenderCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRenderCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
