import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsService } from './transactions.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TransactionsService
  ]
})
export class TransactionsModule { }
