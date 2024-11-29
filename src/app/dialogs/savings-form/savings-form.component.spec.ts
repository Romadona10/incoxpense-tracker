import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFormComponent } from './savings-form.component';

describe('SavingsFormComponent', () => {
  let component: SavingsFormComponent;
  let fixture: ComponentFixture<SavingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsFormComponent]
    });
    fixture = TestBed.createComponent(SavingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
