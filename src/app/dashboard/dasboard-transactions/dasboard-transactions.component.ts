import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/transactions/interfaces/Transaction';
import { TransactionsService } from 'src/app/transactions/transactions.service';

@Component({
  selector: 'fintech-dasboard-transactions',
  templateUrl: './dasboard-transactions.component.html',
  styleUrls: ['./dasboard-transactions.component.scss']
})
export class DasboardTransactionsComponent implements OnInit {
  transactions: Transaction[] | undefined;

  constructor(
    private _transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  async loadTransactions() {
    const transactions = await this._transactionsService.getUserTransactions();

    this.transactions = transactions
      .slice(0, 5);
}
}
