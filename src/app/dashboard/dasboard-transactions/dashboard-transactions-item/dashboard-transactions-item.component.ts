import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/transactions/interfaces/Transaction';

@Component({
  selector: 'fintech-dashboard-transactions-item',
  templateUrl: './dashboard-transactions-item.component.html',
  styleUrls: ['./dashboard-transactions-item.component.scss']
})
export class DashboardTransactionsItemComponent implements OnInit {

  @Input() transaction: Transaction | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
