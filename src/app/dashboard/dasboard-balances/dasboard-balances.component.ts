import { Component, OnInit } from '@angular/core';
import { Balance } from 'src/app/transactions/interfaces/Balance';
import { TransactionsService } from 'src/app/transactions/transactions.service';

@Component({
  selector: 'fintech-dasboard-balances',
  templateUrl: './dasboard-balances.component.html',
  styleUrls: ['./dasboard-balances.component.scss']
})
export class DasboardBalancesComponent implements OnInit {
  balances!: Balance[];
  firstBalance: Balance | undefined;
  restBalances: Balance[] | undefined;

  constructor(
    private _transactionService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.loadUserBalances();
  }


  async loadUserBalances() {
    const balances = await this._transactionService.getUserBalances();

    const sortedBalances = balances.sort(this.sortBalances);
    this.balances = [...sortedBalances];
    this.firstBalance = sortedBalances.shift();
    this.restBalances = [...sortedBalances];
  }

  sortBalances(a: Balance, b: Balance): number {
    if (a.value > b.value) return -1;
    if (b.value > a.value) return 1;
    return 0;
  }
}
