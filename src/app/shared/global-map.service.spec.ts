import { TestBed, inject } from '@angular/core/testing';

import { GlobalMapService } from './global-map.service';

describe('GlobalMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalMapService]
    });
  });

  it('should be created', inject([GlobalMapService], (service: GlobalMapService) => {
    expect(service).toBeTruthy();
  }));
});
