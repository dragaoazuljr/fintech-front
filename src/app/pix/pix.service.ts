import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pix } from './interfaces/Pix';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  api = environment.api;
  keys!: Pix[];

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPixKeys(): Promise<Pix[]> {
    return this._httpClient
      .get<Pix[]>(`${this.api}/pix`)
      .pipe(
        tap(keys => this.keys = keys)
      )
      .toPromise()
  }

  async searchPixKeys(key: string): Promise<Pix[]> {
    if (!this.keys) await this.getPixKeys();
    
    return this.keys?.filter(k => k.key.indexOf(key) !== -1 || k.label.indexOf(key) !== -1);
  }
}
