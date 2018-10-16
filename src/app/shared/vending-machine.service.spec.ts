import { TestBed, inject } from '@angular/core/testing';

import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingMachineService]
    });
  });

  it('should be created', inject([VendingMachineService], (service: VendingMachineService) => {
    expect(service).toBeTruthy();
  }));
});
