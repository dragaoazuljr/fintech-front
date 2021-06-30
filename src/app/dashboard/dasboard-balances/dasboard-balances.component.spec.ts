import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { TransactionsModule } from 'src/app/transactions/transactions.module';
import { TransactionsService } from 'src/app/transactions/transactions.service';

import { DasboardBalancesComponent } from './dasboard-balances.component';

describe('DasboardBalancesComponent', () => {
  let component: DasboardBalancesComponent;
  let fixture: ComponentFixture<DasboardBalancesComponent>;
  let transactionsService: TransactionsService;
  let userBalances = [
    {
      "value": 80,
      "currency": "BRL"
    },
    {
      "value": 900,
      "currency": "USD"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardBalancesComponent ],
      providers: [ TransactionsService ],
      imports: [
        HttpClientTestingModule,
        CardModule,
        RouterModule.forRoot([ ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardBalancesComponent);
    component = fixture.componentInstance;
    transactionsService = TestBed.inject(TransactionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user balances and order by value desc', fakeAsync(() => {
    const transactionSpy = spyOn(transactionsService, "getUserBalances")
      .and
      .resolveTo(userBalances)
    
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    
    const nativeElement: HTMLElement = fixture.nativeElement;
    const firstBalance = nativeElement.querySelector('.first-balance');
    const restBalance = nativeElement.querySelector('.rest-balances');
    const firstBalanceH2ValueElement = firstBalance?.querySelector('h2.body');
    const restBalanceH2ValudeElement = restBalance?.querySelector('h2.body');

    expect(transactionSpy).toHaveBeenCalled();
    expect(firstBalance).toBeTruthy();
    expect(firstBalanceH2ValueElement).toBeTruthy();
    expect(firstBalanceH2ValueElement?.innerHTML).toBe("$900.00")
    expect(restBalance).toBeTruthy();
    expect(restBalanceH2ValudeElement).toBeTruthy();
    expect(restBalanceH2ValudeElement?.innerHTML).toBe("R$80.00");
  }))
});
