import { TestBed } from '@angular/core/testing';

import { AuthfireGuard } from './authfire.guard';

describe('AuthfireGuard', () => {
  let guard: AuthfireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthfireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
