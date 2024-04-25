import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtncallrenderComponent } from './btncallrender.component';

describe('BtncallrenderComponent', () => {
  let component: BtncallrenderComponent;
  let fixture: ComponentFixture<BtncallrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtncallrenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtncallrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
