import { TestBed, inject } from '@angular/core/testing';

import { KeyboardUtilsService } from './keyboard-utils.service';

describe('KeyboardUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardUtilsService]
    });
  });

  it('should be created', inject([KeyboardUtilsService], (service: KeyboardUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
