import { TestBed } from '@angular/core/testing';

import { MoodboardService } from './moodboard.service';

describe('MoodboardService', () => {
  let service: MoodboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
