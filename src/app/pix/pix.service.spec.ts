import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Pix } from './interfaces/Pix';

import { PixService } from './pix.service';

describe('PixService', () => {
  let service: PixService;
  let httpControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PixService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load pix keys', (done) => {
    const mockKeys: Pix[] = [
      {
        _id: "1",
        key: "user@email.com",
        label: "email",
        user: "123"
      }
    ]

    service.getPixKeys()
      .then(keys => 
        expect(JSON.stringify(keys))
          .toBe(JSON.stringify(mockKeys))
        );
    const req = httpControler
        .expectOne('http://localhost:3000/pix')

    req.flush(mockKeys);

    done();
  })

  it("should search pix keys", (done) => {
    const mockKeys: Pix[] = [
      {
        _id: "1",
        key: "user@email.com",
        label: "email",
        user: "123"
      },
      {
        _id: "2",
        key: "test@email.com",
        label: "email",
        user: "123"
      }
    ];

    service.searchPixKeys('test')
      .then(keys => {
        expect(keys.length).toBe(1)
        expect(keys[0].key).toBe("test@email.com")
      })

    const req = httpControler
      .expectOne('http://localhost:3000/pix');

    req.flush(mockKeys)

    
    done()
  })
});
