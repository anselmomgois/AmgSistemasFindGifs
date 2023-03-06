import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'UD3ZCqpvchDmgfYjKtgNcXneuKUmIsPn';
  private _historial: string[] = [];

  constructor(private client: HttpClient) { }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {

    query = query.toLowerCase();

    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.client.get('https://api.giphy.com/v1/gifs/search?api_key=UD3ZCqpvchDmgfYjKtgNcXneuKUmIsPn&q=ferrari&limit=10')
      .subscribe((respuesta:any) => {
        console.log(respuesta.data);
      });

  }




}
