import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTransactionsItemComponent } from './dashboard-transactions-item.component';

describe('DashboardTransactionsItemComponent', () => {
  let component: DashboardTransactionsItemComponent;
  let fixture: ComponentFixture<DashboardTransactionsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTransactionsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTransactionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
