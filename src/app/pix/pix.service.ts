import { HttpClient, HttpRequest } from '@angular/common/http';
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
    
    return this.keys?.filter(k => 
      k.key.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      k.label.toLowerCase().indexOf(key.toLowerCase()) !== -1
    );
  }

  async deletePix(key: string) {
    const req = new HttpRequest('DELETE', `${this.api}/pix`);
    const newReq = req.clone({
      body: { key }
    });

    return this._httpClient.request<Pix>(newReq).toPromise();
  }

  async createPixKey(createPixData: Pix){
    return this._httpClient.post<Pix>(`${this.api}/pix`, createPixData).toPromise()
  }
}
