import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailownerComponent } from './emailowner.component';

describe('EmailownerComponent', () => {
  let component: EmailownerComponent;
  let fixture: ComponentFixture<EmailownerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailownerComponent]
    });
    fixture = TestBed.createComponent(EmailownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
