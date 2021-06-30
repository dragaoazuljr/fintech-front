import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';
import { DasboardBalancesComponent } from './dasboard-balances/dasboard-balances.component';
import { TransactionsModule } from '../transactions/transactions.module';
import { CardModule } from '../shared/components/card/card.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DasboardTransactionsComponent } from './dasboard-transactions/dasboard-transactions.component';
import { DashboardTransactionsItemComponent } from './dasboard-transactions/dashboard-transactions-item/dashboard-transactions-item.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DasboardBalancesComponent,
    DasboardTransactionsComponent,
    DashboardTransactionsItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TransactionsModule,
    CardModule,
    NgScrollbarModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
