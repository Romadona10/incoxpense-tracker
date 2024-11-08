import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUiComponent } from './dashboard-ui.component';

describe('DashboardUiComponent', () => {
  let component: DashboardUiComponent;
  let fixture: ComponentFixture<DashboardUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUiComponent]
    });
    fixture = TestBed.createComponent(DashboardUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
