import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/transactions/interfaces/Transaction';

@Component({
  selector: 'fintech-dashboard-transactions-item',
  templateUrl: './dashboard-transactions-item.component.html',
  styleUrls: ['./dashboard-transactions-item.component.scss']
})
export class DashboardTransactionsItemComponent implements OnInit {

  @Input() transaction: Transaction | undefined;

  timestampDate: Date | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transaction.isFirstChange()){
      this.timestampDate = changes.transaction.currentValue.timestamp ?
        new Date (changes.transaction.currentValue.timestamp) :
        new Date ()
    }
  }

  convertTimestampToDateObj(timestamp: string) {
    return new Date(timestamp);
  }

}
