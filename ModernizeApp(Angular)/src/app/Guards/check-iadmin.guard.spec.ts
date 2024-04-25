import { TestBed } from '@angular/core/testing';

import { CheckIAdminGuard } from './check-iadmin.guard';

describe('CheckIAdminGuard', () => {
  let guard: CheckIAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
