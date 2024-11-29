import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeformComponent } from './incomeform.component';

describe('IncomeformComponent', () => {
  let component: IncomeformComponent;
  let fixture: ComponentFixture<IncomeformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeformComponent]
    });
    fixture = TestBed.createComponent(IncomeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
