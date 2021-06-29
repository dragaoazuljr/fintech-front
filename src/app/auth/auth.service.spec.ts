import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not login and return null', (done) => {
    const loginData = {
      email: "user@test.com",
      password: "User@10"
    };

    service.login(loginData)
      .then(res => {
        expect(res)
          .toBeUndefined();
      })
    
    const req = httpTestingController.expectOne("http://localhost:3000/auth/login");

    req.error(new ErrorEvent('HttpError'));

    done()
  })

  it('should login and return access token', (done) => {
    const loginData = {
      email: "user@test.com",
      password: "User@10"
    }

    const mockResponse = {
      access_token: 123
    };
    
    service.login(loginData).then(res => {
      expect(JSON.stringify(res))
        .toEqual(JSON.stringify(mockResponse))
    })
    
    const req = httpTestingController.expectOne("http://localhost:3000/auth/login");
    
    req.flush(mockResponse);
    done()
  })
});
