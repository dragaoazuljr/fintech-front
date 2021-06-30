import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpTestingController: HttpTestingController;
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


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud load user balance', (done) => {
    service.getUserBalances()
      .then(res => {
        expect(JSON.stringify(res))
          .toBe(JSON.stringify(userBalances))
      })

    const req = httpTestingController
      .expectOne('http://localhost:3000/transactions/balance')

    req.flush(userBalances);

    done()
  })
});
