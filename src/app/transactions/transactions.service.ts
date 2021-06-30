import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Balance } from './interfaces/Balance';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  api = environment.api;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserBalances(): Promise<Balance[]>{
    return this.httpClient.get<Balance[]>(`${this.api}/transactions/balance`).toPromise()
  }
}
