import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Transaction, TransactionType } from 'src/app/transactions/interfaces/Transaction';

import { DashboardTransactionsItemComponent } from './dashboard-transactions-item.component';

describe('DashboardTransactionsItemComponent', () => {
  let component: DashboardTransactionsItemComponent;
  let fixture: ComponentFixture<DashboardTransactionsItemComponent>;
  let transaction: Transaction = {
    _id: "1",
    currency: 'BRL',
    type: TransactionType.CREDIT,
    userFrom: {
      _id: "1",
      name: "User From",
      email: "user.from@email.com"
    },
    userTo: {
      _id: "2",
      name: "User To",
      email: "user.to@email.com"
    },
    value: 100,
    desc: 'initial-transaction',
    timestamp: "2021-06-30T20:45:44.658+00:00"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTransactionsItemComponent ],
      imports: [ CommonModule ]
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

  it('should format the type of value based on the type of transaction', () => {
    component.transaction = transaction;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const valueSpan = nativeElement.querySelector(`span.${TransactionType.CREDIT}`);

    expect(valueSpan).toBeTruthy();
    expect(valueSpan.innerHTML).toContain('+');
    expect(valueSpan.innerHTML).toContain('R$100.00');
  })

  it('should format date', () => {
    component.transaction = transaction;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const dateDiv = nativeElement.querySelector(`div.timestamp`);

    expect(dateDiv).toBeTruthy();
    expect(dateDiv.innerHTML).toContain('30/06/2021')
  })

  it('should show the correct user based on type of the transaction', () => {
    component.transaction = transaction;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const userToElement = nativeElement.querySelector('div.user-to');

    expect(userToElement).toBeTruthy();
    expect(userToElement.innerHTML).toContain('User From')
  })

  it('should show the currency of the transaction', () => {
    component.transaction = transaction;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const currencyElement = nativeElement.querySelector('div.currency');

    expect(currencyElement).toBeTruthy();
    expect(currencyElement.innerHTML).toContain('BRL')
  })

  it('should show the desc of the transaction', () => {
    component.transaction = transaction;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const descElement = nativeElement.querySelector('div.desc');

    expect(descElement).toBeTruthy();
    expect(descElement.innerHTML).toContain('initial-transaction')
  })
});
