import { TestBed, inject } from '@angular/core/testing';

import { RefreshEmitterService } from './refresh-emitter.service';

describe('RefreshEmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshEmitterService]
    });
  });

  it('should be created', inject([RefreshEmitterService], (service: RefreshEmitterService) => {
    expect(service).toBeTruthy();
  }));
});
