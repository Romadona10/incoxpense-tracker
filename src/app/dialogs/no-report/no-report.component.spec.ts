import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReportComponent } from './no-report.component';

describe('NoReportComponent', () => {
  let component: NoReportComponent;
  let fixture: ComponentFixture<NoReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoReportComponent]
    });
    fixture = TestBed.createComponent(NoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
