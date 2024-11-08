import { TestBed } from '@angular/core/testing';

import { NotificationsettingsService } from './notificationsettings.service';

describe('NotificationsettingsService', () => {
  let service: NotificationsettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
