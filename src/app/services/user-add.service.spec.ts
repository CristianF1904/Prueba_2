import { TestBed } from '@angular/core/testing';

import { UserAddService } from './user-add.service';

describe('UserAddService', () => {
  let service: UserAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
