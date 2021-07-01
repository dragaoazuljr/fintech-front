import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';
import { DasboardBalancesComponent } from './dasboard-balances/dasboard-balances.component';
import { CardModule } from '../shared/components/card/card.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DasboardTransactionsComponent } from './dasboard-transactions/dasboard-transactions.component';
import { DashboardTransactionsItemComponent } from './dasboard-transactions/dashboard-transactions-item/dashboard-transactions-item.component';
import { DasboardPixComponent } from './dasboard-pix/dasboard-pix.component';
import { PixService } from '../pix/pix.service';
import { TransactionsService } from '../transactions/transactions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DashboardComponent,
    DasboardBalancesComponent,
    DasboardTransactionsComponent,
    DashboardTransactionsItemComponent,
    DasboardPixComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    DashboardService,
    PixService,
    TransactionsService
  ]
})
export class DashboardModule { }
