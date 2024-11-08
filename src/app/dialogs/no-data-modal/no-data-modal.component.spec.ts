import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataModalComponent } from './no-data-modal.component';

describe('NoDataModalComponent', () => {
  let component: NoDataModalComponent;
  let fixture: ComponentFixture<NoDataModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoDataModalComponent]
    });
    fixture = TestBed.createComponent(NoDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
