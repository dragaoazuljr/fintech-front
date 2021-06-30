import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { Transaction } from 'src/app/transactions/interfaces/Transaction';
import { TransactionsService } from 'src/app/transactions/transactions.service';

import { DasboardTransactionsComponent } from './dasboard-transactions.component';
import { userTransactionsMock } from './mocks/UserTransactions';

describe('DasboardTransactionsComponent', () => {
  let component: DasboardTransactionsComponent;
  let fixture: ComponentFixture<DasboardTransactionsComponent>;
  let transactionsService: TransactionsService;
  const userTransactions = userTransactionsMock as Transaction[];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardTransactionsComponent ],
      imports: [
        CardModule,
        HttpClientTestingModule
      ],
      providers: [
        TransactionsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    transactionsService = TestBed.inject(TransactionsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('should load last 5 users transactions', fakeAsync(() => {
    const spy = spyOn(transactionsService, "getUserTransactions")
      .and
      .resolveTo(userTransactions)

    component.ngOnInit()
    tick()
    fixture.detectChanges();
    
    const nativeElement = fixture.nativeElement;
    const transactionsListElement = nativeElement.querySelector('.transactions-list');

    expect(component.transactions?.length).toBe(5);
    expect(transactionsListElement).toBeTruthy();
  }))
});
