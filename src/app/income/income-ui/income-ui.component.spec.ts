import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeUiComponent } from './income-ui.component';

describe('IncomeUiComponent', () => {
  let component: IncomeUiComponent;
  let fixture: ComponentFixture<IncomeUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeUiComponent]
    });
    fixture = TestBed.createComponent(IncomeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
