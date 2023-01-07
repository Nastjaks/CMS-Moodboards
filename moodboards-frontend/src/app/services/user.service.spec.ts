import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

// @ts-ignore
describe('UserService', () => {
  let service: UserService;
// @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });
// @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
