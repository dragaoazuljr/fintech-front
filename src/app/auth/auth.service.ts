import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUserData } from './interfaces/CreateUserData';
import { LoginUserData } from './interfaces/LoginUserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;

  constructor(
    private _httpClient: HttpClient
  ) { }

  async login(loginUserData: LoginUserData){
    const { access_token } = await this._httpClient
      .post<{ access_token: string}>(`${this.api}/auth/login`, loginUserData)
      .pipe(catchError(err => of({ access_token: null })))
      .toPromise()
    
    if (!access_token) return;

    return this.persistAcessToken({ access_token });
  }

  persistAcessToken(res: { access_token: string; }) {
    localStorage.setItem("accessToken", res.access_token);

    return res
  }

  async signUp(createUserData: CreateUserData) {
    return this._httpClient
      .post<any>(`${this.api}/users`, createUserData)
      .toPromise()
  }
}
