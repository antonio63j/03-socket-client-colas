import { TestBed } from '@angular/core/testing';

import { WebrestService } from './webrest.service';

describe('WebrestService', () => {
  let service: WebrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
