import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsNotificationsComponent } from './savings-notifications.component';

describe('SavingsNotificationsComponent', () => {
  let component: SavingsNotificationsComponent;
  let fixture: ComponentFixture<SavingsNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsNotificationsComponent]
    });
    fixture = TestBed.createComponent(SavingsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
