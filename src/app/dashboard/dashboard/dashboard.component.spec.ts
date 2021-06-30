import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransactionsService } from 'src/app/transactions/transactions.service';

import { DashboardComponent } from './dashboard.component';
import { DasboardBalancesComponent } from '../dasboard-balances/dasboard-balances.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/components/card/card.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let transactionsSertvice: TransactionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        DasboardBalancesComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        CardModule
      ],
      providers: [
        TransactionsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    transactionsSertvice = TestBed.inject(TransactionsService);
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
